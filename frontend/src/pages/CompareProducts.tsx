import React, { useState, useRef } from "react";
import axios from "axios";
import CompareTable from "../components/ui/CompareTable";

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
};

const CompareProducts = () => {
    const [imageSrc1, setImageSrc1] = useState<string | null>(null);
    const [imageSrc2, setImageSrc2] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [activeCamera, setActiveCamera] = useState<1 | 2 | null>(null);
    const [isProduct1Captured, setIsProduct1Captured] = useState(false);
    const [isProduct2Captured, setIsProduct2Captured] = useState(false);
    const [class1, setClass1] = useState("");
    const [class2, setClass2] = useState("");
    const [class1Response, setClass1Response] = useState("");
    const [class2Response, setClass2Response] = useState("");
    const [showCompareTable, setShowCompareTable] = useState(false);

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (err) {
            console.error("Error accessing webcam: ", err);
        }
    };

    const stopWebcam = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream)
                .getTracks()
                .forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setActiveCamera(null);
    };

    const capturePhoto = async (setImageSrc: React.Dispatch<React.SetStateAction<string | null>>, setCaptured: React.Dispatch<React.SetStateAction<boolean>>, setClass: React.Dispatch<React.SetStateAction<string>>) => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const image = canvas.toDataURL("image/png");
                setImageSrc(image);
                setCaptured(true);
                stopWebcam();
    
                // API call to detect product data
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
    
                    const detectedClass = response.data.predictions[0].class;
                    console.log(`Detected class: ${detectedClass}`);
                    setClass(detectedClass);
                } catch (error) {
                    console.error("Error:", error.message);
                }
            }
        }
    };
    
    const generateProsAndCons = async (productClass: string, setResponse: React.Dispatch<React.SetStateAction<string>>) => {
        const productInfo = classMap[productClass] ? JSON.stringify(classMap[productClass]) : "No information available";
        const prompt = `Give pros and cons of ${productClass} and take context from ${productInfo}. Use the given context and the data you have to give the required info. Give pros and cons no matter what. Dont tell me any other thing apart from the pros and cons. Give the response in not more than 150 words`;
        console.log(`Procut Class ${productClass} Product Info: ${productInfo} 10101 Prompt: ${prompt}`);
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBh0pgV-O6iO-FPYCH7hjDwIzKYBepk4Z8`,
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    contents: [{ parts: [{ text: prompt }] }],
                },
            });
    
            setResponse(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error("Error:", (error as any).response ? (error as any).response.data : (error as any).message);
            setResponse("Sorry - Something went wrong. Please try again!");
        }
    };

    return (
        <div className="bg-black h-screen flex flex-col items-center overflow-auto">
            {showCompareTable ? (
                <CompareTable 
                    classone={class1} 
                    classtwo={class2} 
                    imageSrc1={imageSrc1} 
                    imageSrc2={imageSrc2} 
                    classoneResponse={class1Response} 
                    classtwoResponse={class2Response} 
                />
            ) : (
                <>
                    <div className="pt-7">
                        <p className="text-7xl text-white font-extrabold">Compare Products</p>
                    </div>

                    <div className="pt-7 flex items-center justify-center gap-14  space-y-4 ">
                        {imageSrc1 ? (
                            <div className="text-center">
                                <p className="text-white text-2xl mb-2 font-bold">Product 1</p>
                                <img src={imageSrc1} alt="Captured Product 1" className="w-64 h-64 rounded-lg shadow-lg" />
                            </div>
                        ) : (
                            activeCamera === 1 && (
                                <video ref={videoRef} className="w-64 h-64 rounded-lg shadow-lg"></video>
                            )
                        )}

                        {imageSrc2 ? (
                            <div className="text-center">
                                <p className="text-white text-2xl mb-2 font-bold">Product 2</p>
                                <img src={imageSrc2} alt="Captured Product 2" className="w-64 h-64 rounded-lg shadow-lg" />
                            </div>
                        ) : (
                            activeCamera === 2 && (
                                <video ref={videoRef} className="w-64 h-64 rounded-lg shadow-lg"></video>
                            )
                        )}
                    </div>

                    <div className="flex space-x-4 pt-7">
                        <div className={`${isProduct1Captured ? "hidden" : ""}`}>
                            <button
                                onClick={() => {
                                    setActiveCamera(1);
                                    startWebcam();
                                }}
                                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-2xl"
                                disabled={isProduct1Captured}
                            >
                                Take Product 1
                            </button>
                        </div>

                        <div className={`${isProduct2Captured ? "hidden" : ""}`}>
                            <button
                                onClick={() => {
                                    setActiveCamera(2);
                                    startWebcam();
                                }}
                                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-2xl"
                                disabled={isProduct2Captured}
                            >
                                Take Product 2
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center pt-7">
                        {activeCamera && (
                            <button
                                onClick={() =>
                                    activeCamera === 1
                                        ? capturePhoto(setImageSrc1, setIsProduct1Captured, setClass1)
                                        : capturePhoto(setImageSrc2, setIsProduct2Captured, setClass2)
                                }
                                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-2xl"
                            >
                                Capture
                            </button>
                        )}
                    </div>

                    {isProduct1Captured && isProduct2Captured && (
                        <div className="flex justify-center pt-7">
                            <button
                                onClick={async () => {
                                    await generateProsAndCons(class1, setClass1Response);
                                    await generateProsAndCons(class2, setClass2Response);
                                    setShowCompareTable(true);
                                }}
                                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-2xl"
                            >
                                Compare
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CompareProducts;