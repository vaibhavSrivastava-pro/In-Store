import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../components/ui/Button";

interface ItemInfo {
    price: number;
    quantity: number;
    ingredients: string;
    manufacture_date: string;
    expiry_date: string;
    nutritional_information: string;
}

interface Prediction {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class: string;
    class_id: number;
    detection_id: string;
}

const infoMap: Record<string, ItemInfo> = {
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

const Billing = () => {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const openCameraAndTakePicture = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
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
                        setCapturedImage(image); // Set the captured image

                        // Stop all video tracks immediately after capturing the image
                        stream.getTracks().forEach(track => track.stop());

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
                            console.log("Res", response)
                            // Update predictions state with the response data
                            setPredictions(response.data.predictions);
                        } catch (error: any) {
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

    const calculateTotal = () => {
        let total = 0;
        predictions.forEach((prediction) => {
            const itemInfo = infoMap[prediction.class];
            if (itemInfo) {
                total += itemInfo.price;
            }
        });
        return total;
    };

    const itemCountMap: Record<string, number> = predictions.reduce((acc, prediction) => {
        acc[prediction.class] = (acc[prediction.class] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-black text-white">
            {/* Left side - Image input */}
            <div className="lg:w-1/2 flex items-center justify-center bgblack p-6">
                <div className="w-full">
                    <h2 className="text-xl font-bold mb-4">Upload Image</h2>
                    {capturedImage ? (
                        <img src={capturedImage} alt="Captured" className="mb-4 w-full h-auto" />
                    ) : (
                        <video ref={videoRef} className="mb-4 w-full h-auto"></video>
                    )}
                    <div className="border border-gray-700 p-4 rounded-lg">
                        <p className="font-semibold">Predicted Items:</p>
                        <ul>
                            {predictions.map((prediction, index) => (
                                <li key={index} className="py-1">
                                    {prediction.class}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right side - Billing summary */}
            <div className="lg:w-1/2 p-8 bg-gray-900 text-white">
                <h1 className="text-4xl font-bold mb-8">Billing Summary</h1>
                <div className="space-y-4">
                    {Object.keys(itemCountMap).map((itemClass) => (
                        <div key={itemClass} className="flex justify-between">
                            <span>
                                {itemClass} x {itemCountMap[itemClass]}
                            </span>
                            <span>
                                ₹{infoMap[itemClass].price * itemCountMap[itemClass]}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-700 mt-8 mb-4 pt-4 flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                </div>
                <Button value="Pay Now" link="/PayNow" />
            </div>
        </div>
    );
};

export default Billing;