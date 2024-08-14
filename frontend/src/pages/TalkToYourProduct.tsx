import { useState, useEffect, useRef, FormEvent } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Button from "../components/ui/Button";

interface ProductData {
  price: number;
  quantity: number;
  ingredients: string;
  manufacture_date: string;
  expiry_date: string;
  nutritional_information: string;
}

const classMap: Record<string, ProductData> = {
  "Lifebuoy Soap": {
    price: 30.00,
    quantity: 50,
    ingredients: "Sodium Palmate,Sodium Palm Kernelate,Aqua,Glycerin,Fragrance,Sodium Chloride,Citric Acid",
    manufacture_date: "2024-01-15",
    expiry_date: "2025-01-15",
    nutritional_information: "None"
  },
  "Dettol Handwash": {
    price: 70.00,
    quantity: 100,
    ingredients: "Aqua, Sodium Laureth Sulfate, Glycerin,Cocamidopropyl Betaine,Sodium Chloride,Fragrance, Chloroxylenol",
    manufacture_date: "2024-03-10",
    expiry_date: "2026-03-10",
    nutritional_information: "None"
  },
  "Kurkure": {
    price: 20.00,
    quantity: 100,
    ingredients: "Cornmeal, Edible Vegetable Oil, Spices & Condiments, Sugar, Salt, Acidity Regulators,Flavor Enhancers,Antioxidants",
    manufacture_date: "2024-03-2",
    expiry_date: "2025-01-15",
    nutritional_information: "energy - 523 kcal, protein - 6.7 g, carbohydrates 60 g, sugar - 2.4 g, fat - 28.6 g"
  },
  "Ariel": {
    price: 100.00,
    quantity: 10,
    ingredients: "Surfactants,Enzymes,Sodium Carbonate,Bleaching Agents,Optical Brighteners,Fragrance",
    manufacture_date: "2024-03-2",
    expiry_date: "2025-01-15",
    nutritional_information: "None"
  },
  "Fanta": {
    price: 20.00,
    quantity: 100,
    ingredients: "Carbonated Water, Sugar, Citric Acid, Natural Flavors, Sodium Benzoate, Food Color (Sunset Yellow FCF)",
    manufacture_date: "2024-03-2",
    expiry_date: "2025-01-15",
    nutritional_information: "energy - 44 kcal, protein - 0 g, carbohydrates - 11 g,  sugar - 11 g, fat - 0 g"
  },
  "Colgate": {
    price: 20.00,
    quantity: 100,
    ingredients: "Sorbitol, Water,Silica, Sodium Lauryl Sulfate, Sodium Fluoride, Flavor, Sodium Saccharin",
    manufacture_date: "2024-03-2",
    expiry_date: "2025-01-15",
    nutritional_information: "None"
  }
}

const loadImageBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const TalkToYourProduct = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [generatingAnswer, setGeneratingAnswer] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [preprocessedPrompt, setPreprocessedPrompt] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const openCameraAndTakePicture = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        setTimeout(async () => {
          const canvas = document.createElement("canvas");
          if (videoRef.current) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext("2d");
            if (context) {
              context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            }
            const image = canvas.toDataURL("image/png");
            setImageSrc(image);

            // Stop all video tracks immediately after capturing the image
            stream.getTracks().forEach(track => track.stop());

            // New API call to detect product data
            try {
              const response = await axios({
                method: "POST",
                url: "https://detect.roboflow.com/shop_stock_dataset/1",
                params: {
                  api_key: "6uxC2XiBBuYzgBfNyulF"
                },
                data: image,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              });
              console.log(response.data);

              // Access the class of the first prediction
              const firstPredictionClass = response.data.predictions[0].class;
              console.log(`The class of the first prediction is: ${firstPredictionClass}`);
              const productData = JSON.stringify(classMap[firstPredictionClass]);

              // Update the initial prompt with the detected class
              const initialPrompt = `Talk like a good assistant, give every response in not more than 40 words. Start with basic info about the grocery product(Note - It is a grocery product) - ${firstPredictionClass}`;
              setPreprocessedPrompt(`I will ask you a question regarding the grocery product(Note - It is a grocery product) ${firstPredictionClass} and take context from ${productData}. Answer the question - `)

              // Initial API call after capturing the image
              setGeneratingAnswer(true);
              setAnswer("Loading your answer... \n It might take up to 10 seconds");
              try {
                const response = await axios({
                  url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBh0pgV-O6iO-FPYCH7hjDwIzKYBepk4Z8`,
                  method: "post",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: {
                    contents: [{ parts: [{ text: initialPrompt }] }],
                  },
                });

                setAnswer(
                  response.data.candidates[0].content.parts[0].text
                );
              } catch (error) {
                console.error("Error:", (error as any).response ? (error as any).response.data : (error as any).message);
                setAnswer("Sorry - Something went wrong. Please try again!");
              }
              setGeneratingAnswer(false);
            } catch (error: any) {
              console.error("Error:", error.message);
            }
          }
        }, 2000);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    openCameraAndTakePicture();
  }, []);

  async function generateAnswer(e: FormEvent<HTMLFormElement>) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const concatenatedPrompt = preprocessedPrompt + question;
      console.log("PP", concatenatedPrompt)
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBh0pgV-O6iO-FPYCH7hjDwIzKYBepk4Z8`, // Ensure the API key and URL are correct
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          contents: [{ parts: [{ text: concatenatedPrompt }] }],
        },
      });
      setAnswer(
        response.data.candidates[0].content.parts[0].text
      );
    } catch (error) {
      console.error("Error:", ((error as any).response ? (error as any).response.data : (error as any).message) as any);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="min-h-screen p-3 flex flex-col justify-center items-center bg-gray-900 text-white">
        {imageSrc ? (
          <div className="w-full md:w-2/5 lg:w-1/4 xl:w-1/5 text-center rounded-lg bg-gray-800 my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
            <img src={imageSrc} alt="Captured" className="p-4 rounded-md" />
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-gray-800 my-4 shadow-lg transition-all duration-500 transform hover:scale-105"
          ></video>
        )}
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-gray-800 my-4 shadow-lg transition-all duration-500 transform hover:scale-105 overflow-hidden">
          <ReactMarkdown className="p-4 max-h-96 overflow-y-auto">{answer}</ReactMarkdown>
        </div>
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-gray-800 py-6 px-4 transition-all duration-500 transform hover:scale-105"
        >
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Chat AI</h1>
          <textarea
            required
            className="border border-gray-600 rounded w-full my-2 p-3 min-h-[100px] transition-all duration-300 bg-gray-900 text-white focus:border-blue-400 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <Button 
            value="Generate answer" 
            onClick={generateAnswer} 
            disabled={generatingAnswer} 
          />
        </form>
      </div>
    </>
  )
}

export default TalkToYourProduct