import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const TalkToYourProduct = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [productData, setProductData] = useState("Oreo");
  const videoRef = useRef(null);

const initialPrompt = `Describe ${productData} in 20 words refering it as you`

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
              // Taking response from CNN model and storing it in productData
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
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBh0pgV-O6iO-FPYCH7hjDwIzKYBepk4Z8`, // Ensure the API key and URL are correct
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          contents: [{ parts: [{ text: question }] }],
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
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-3 flex flex-col justify-center items-center">
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
        className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${
          generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
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