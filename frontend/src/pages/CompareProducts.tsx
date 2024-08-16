import React, { useState, useRef } from "react";
import axios from "axios";
import CompareTable from "../components/ui/CompareTable";
import SparklesPreview from "../components/ui/Title";
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
        price: 30.0,
        quantity: 50,
        ingredients:
            "Sodium Palmate,Sodium Palm Kernelate,Aqua,Glycerin,Fragrance,Sodium Chloride,Citric Acid",
        manufacture_date: "2024-01-15",
        expiry_date: "2025-01-15",
        nutritional_information: "None",
    },
    "Dettol Handwash": {
        price: 70.0,
        quantity: 100,
        ingredients:
            "Aqua, Sodium Laureth Sulfate, Glycerin,Cocamidopropyl Betaine,Sodium Chloride,Fragrance, Chloroxylenol",
        manufacture_date: "2024-03-10",
        expiry_date: "2026-03-10",
        nutritional_information: "None",
    },
    Kurkure: {
        price: 20.0,
        quantity: 100,
        ingredients:
            "Cornmeal, Edible Vegetable Oil, Spices & Condiments, Sugar, Salt, Acidity Regulators,Flavor Enhancers,Antioxidants",
        manufacture_date: "2024-03-2",
        expiry_date: "2025-01-15",
        nutritional_information:
            "energy - 523 kcal, protein - 6.7 g, carbohydrates 60 g, sugar - 2.4 g, fat - 28.6 g",
    },
    Ariel: {
        price: 100.0,
        quantity: 10,
        ingredients:
            "Surfactants,Enzymes,Sodium Carbonate,Bleaching Agents,Optical Brighteners,Fragrance",
        manufacture_date: "2024-03-2",
        expiry_date: "2025-01-15",
        nutritional_information: "None",
    },
    Fanta: {
        price: 20.0,
        quantity: 100,
        ingredients:
            "Carbonated Water, Sugar, Citric Acid, Natural Flavors, Sodium Benzoate, Food Color (Sunset Yellow FCF)",
        manufacture_date: "2024-03-2",
        expiry_date: "2025-01-15",
        nutritional_information:
            "energy - 44 kcal, protein - 0 g, carbohydrates - 11 g,  sugar - 11 g, fat - 0 g",
    },
    Colgate: {
        price: 20.0,
        quantity: 100,
        ingredients:
            "Sorbitol, Water,Silica, Sodium Lauryl Sulfate, Sodium Fluoride, Flavor, Sodium Saccharin",
        manufacture_date: "2024-03-2",
        expiry_date: "2025-01-15",
        nutritional_information: "None",
    },
};

const CompareProducts: React.FC = () => {
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
    const [loading, setLoading] = useState(false); // Loader state

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
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

    const capturePhoto = async (
        setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
        setCaptured: React.Dispatch<React.SetStateAction<boolean>>,
        setClass: React.Dispatch<React.SetStateAction<string>>
    ) => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(
                    videoRef.current,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const image = canvas.toDataURL("image/png");
                setImageSrc(image);
                setCaptured(true);
                stopWebcam();
                setLoading(true); // Show loader

                // API call to detect product data
                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://detect.roboflow.com/shop_stock_dataset/1",
                        params: {
                            api_key: import.meta.env.VITE_ROBOFLOW_API_KEY,
                        },
                        data: image,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });

                    const detectedClass = response.data.predictions[0].class;
                    console.log(`Detected class: ${detectedClass}`);
                    setClass(detectedClass);
                } catch (error) {
                    console.error("Error:", (error as any)?.message);
                } finally {
                    setLoading(false); // Hide loader
                }
            }
        }
    };

    const generateProsAndCons = async (
        productClass: string,
        setResponse: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const productInfo = classMap[productClass]
            ? JSON.stringify(classMap[productClass])
            : "No information available";
        const prompt = `Give pros and cons of ${productClass} and take context from ${productInfo}. Use the given context and the data you have to give the required info. Give pros and cons no matter what. Dont tell me any other thing apart from the pros and cons. Give the response in not more than 150 words`;
        console.log(
            `Procut Class ${productClass} Product Info: ${productInfo} 10101 Prompt: ${prompt}`
        );
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    contents: [{ parts: [{ text: prompt }] }],
                },
            });

            setResponse(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error(
                "Error:",
                (error as any).response
                    ? (error as any).response.data
                    : (error as any).message
            );
            setResponse("Sorry - Something went wrong. Please try again!");
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center overflow-auto px-4 py-8 md:py-12">
            {showCompareTable ? (
                <>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-14 space-y-4 md:space-y-0">
                        <div className="text-center">
                            <p className="text-white text-2xl mb-2 font-bold">Product 1</p>
                            <img
                                src={imageSrc1 || ""}
                                alt="Captured Product 1"
                                className="w-64 h-64 rounded-lg object-cover border-4 border-blue-500"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-white text-2xl mb-2 font-bold">Product 2</p>
                            <img
                                src={imageSrc2 || ""}
                                alt="Captured Product 2"
                                className="w-64 h-64 rounded-lg object-cover border-4 border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="pt-7 flex flex-col md:flex-row items-center justify-center gap-14 space-y-4 md:space-y-0">
                        <CompareTable
                            classone={class1}
                            classtwo={class2}
                            classoneResponse={class1Response}
                            classtwoResponse={class2Response} imageSrc1={null} imageSrc2={null}                        />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <SparklesPreview value="Compare Products" />
                    </div>

                    <div className="pt-7 flex flex-col md:flex-row items-center justify-center gap-14 space-y-4 md:space-y-0">
                        {imageSrc1 ? (
                            <div className="flex flex-col items-center text-center">
                                <p className="text-white text-2xl mb-2 font-bold">Product 1</p>
                                <img
                                    src={imageSrc1}
                                    alt="Captured Product 1"
                                    className="w-64 h-64 rounded-lg object-cover border-4 border-blue-500"
                                />
                            </div>
                        ) : (
                            <Button 
                                value="Capture Product 1" 
                                onClick={() => {
                                    setActiveCamera(1);
                                    startWebcam();
                                }}
                            />
                        )}

                        {imageSrc2 ? (
                            <div className="">
                                <p className="text-white text-2xl mb-2 font-bold">Product 2</p>
                                <img
                                    src={imageSrc2}
                                    alt="Captured Product 2"
                                    className="w-64 h-64 rounded-lg object-cover border-4 border-blue-500"
                                />
                            </div>
                        ) : (
                            <Button 
                                value="Capture Product 2" 
                                onClick={() => {
                                    setActiveCamera(2);
                                    startWebcam();
                                }}
                            />
                        )}
                    </div>

                    {activeCamera && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
                            <video
                                ref={videoRef}
                                className="w-full max-w-md md:max-w-2xl lg:max-w-4xl rounded-lg border-4 border-blue-500"
                            />
                            <div className="absolute bottom-10 flex space-x-4">
                                <Button
                                    value="Capture Photo"
                                    onClick={() => {
                                        if (activeCamera === 1) {
                                            capturePhoto(setImageSrc1, setIsProduct1Captured, setClass1);
                                        } else {
                                            capturePhoto(setImageSrc2, setIsProduct2Captured, setClass2);
                                        }
                                    }}
                                />
                                <Button
                                    value="Cancel"
                                    onClick={stopWebcam}
                                />
                            </div>
                        </div>
                    )}

                    {isProduct1Captured && isProduct2Captured && (
                        <div className="pt-7 text-center">
                            <Button
                                value="Compare Products"
                                onClick={() => {
                                    generateProsAndCons(class1, setClass1Response);
                                    generateProsAndCons(class2, setClass2Response);
                                    setShowCompareTable(true);
                                }}
                            />
                        </div>
                    )}

                    {loading && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
                            <div className="bg-slate-900 text-white p-5 rounded-lg shadow-lg text-center">
                                <p className="text-xl font-semibold mb-2">Processing...</p>
                                <p className="text-gray-300">Please wait while we detect the product details.</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CompareProducts;
