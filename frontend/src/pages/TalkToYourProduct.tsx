import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const classMap = {
  "Lifebuoy Soap": {
    "price": 30.00,
    "quantity": 50,
    "manufacture_date": "2024-01-15",
    "expiry_date": "2025-01-15"
  },
  "Dettol Handwash": {
    "price": 70.00,
    "quantity": 100,
    "manufacture_date": "2024-03-10",
    "expiry_date": "2026-03-10"
  },
  "Kurkure": {
    "price": 20.00,
    "quantity": 100,
    "manufacture_date": "2024-03-2",
    "expiry_date": "2025-01-15"
  },
  "Ariel": {
    "price": 100.00,
    "quantity": 10,
    "manufacture_date": "2024-03-2",
    "expiry_date": "2025-01-15"
  },
  "Fanta": {
    "price": 20.00,
    "quantity": 100,
    "manufacture_date": "2024-03-2",
    "expiry_date": "2025-01-15"
  },
  "Colgate": {
    "price": 20.00,
    "quantity": 100,
    "manufacture_date": "2024-03-2",
    "expiry_date": "2025-01-15"
  }
}

const loadImageBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const TalkToYourProduct = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  // const [productData, setProductData] = useState(null);
  const [preprocessedPrompt, setPreprocessedPrompt] = useState("")
  const videoRef = useRef(null);

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
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
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
              // setProductData(response.data); // Store the result in productData
              
              // Access the class of the first prediction
              const firstPredictionClass = response.data.predictions[0].class;
              console.log(`The class of the first prediction is: ${firstPredictionClass}`);
              const productData = JSON.stringify(classMap[firstPredictionClass]);
              

              // Update the initial prompt with the detected class
              const initialPrompt = `Talk like a good assistant, give every response in not more than 40 words. Start with basic info about ${firstPredictionClass}`;
              // const preprocessedPrompt = `I will ask you a question regarding ${firstPredictionClass} and take context from ${productData}. Answer the question - `;
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
                console.error("Error:", error.response ? error.response.data : error.message);
                setAnswer("Sorry - Something went wrong. Please try again!");
              }
              setGeneratingAnswer(false);
            } catch (error) {
              console.error("Error:", error.message);
            }
          }
        }, 4000);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    openCameraAndTakePicture();
  }, []);

  async function generateAnswer(e) {
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
      console.error("Error:", error.response ? error.response.data : error.message);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }  
    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="h-screen p-3 flex flex-col justify-center items-center">
        {imageSrc ? (
          <div className="w-full md:w-2/5 lg:w-1/4 xl:w-1/5 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
            <img src={imageSrc} alt="Captured" className="p-4" />
          </div>
        ) : (
          <video ref={videoRef} className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105"></video>
        )}
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
          <ReactMarkdown className="p-4">{answer}</ReactMarkdown>
        </div>
        <form
          onSubmit={generateAnswer}
          className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
        >
          <h1 className="text-4xl font-bold text-blue-500 mb-4 animate-bounce">Chat AI</h1>
          <textarea
            required
            className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={generatingAnswer}
          >
            Generate answer
          </button>
        </form>
      </div>
    </>
  )
}

export default TalkToYourProduct