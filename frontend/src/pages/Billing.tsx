import React, { useState } from "react";

interface ItemInfo {
    price: number;
    ingredients: string;
    "nutritional information": string;
    "manufacturing information": string;
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
    Ariel: {
        price: 40,
        ingredients: "niubibiyb",
        "nutritional information": "hbjhbjhbhjb",
        "manufacturing information": "jjbiuiub",
    },
    Kurkure: {
        price: 20,
        ingredients: "niubibiyb",
        "nutritional information": "hbjhbjhbhjb",
        "manufacturing information": "jjbiuiub",
    },
    Maggie: {
        price: 30,
        ingredients: "niubibiyb",
        "nutritional information": "hbjhbjhbhjb",
        "manufacturing information": "jjbiuiub",
    },
};

const Billing = () => {
    const [predictions, setPredictions] = useState<Prediction[]>([
        {
            x: 337,
            y: 302,
            width: 390,
            height: 454,
            confidence: 0.949,
            class: "Ariel",
            class_id: 0,
            detection_id: "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6",
        },
        {
            x: 337,
            y: 302,
            width: 390,
            height: 454,
            confidence: 0.949,
            class: "Ariel",
            class_id: 0,
            detection_id: "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6",
        },
        {
            x: 337,
            y: 302,
            width: 390,
            height: 454,
            confidence: 0.949,
            class: "Maggie",
            class_id: 0,
            detection_id: "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6",
        },
        {
            x: 337,
            y: 302,
            width: 390,
            height: 454,
            confidence: 0.949,
            class: "Maggie",
            class_id: 0,
            detection_id: "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6",
        },
        {
            x: 337,
            y: 302,
            width: 390,
            height: 454,
            confidence: 0.949,
            class: "Maggie",
            class_id: 0,
            detection_id: "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6",
        },
        {
            x: 337,
            y: 302,
            width: 390,
            height: 454,
            confidence: 0.949,
            class: "Kurkure",
            class_id: 0,
            detection_id: "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6",
        },
        {
            x: 337,
            y: 302,
            width: 390,
            height: 454,
            confidence: 0.949,
            class: "Kurkure",
            class_id: 0,
            detection_id: "bf52eb0c-9aa3-459d-9460-e59ffcc7c3c6",
        },
    ]);

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
        <div className="flex h-screen">
            {/* Left side - Image input */}
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <div>
                    <h2 className="text-xl font-bold mb-4">Upload Image</h2>
                    <input type="file" className="mb-4" />
                    <div className="border border-gray-300 p-4">
                        <p>Predicted Items:</p>
                        <ul>
                            {predictions.map((prediction, index) => (
                                <li key={index}>
                                    {prediction.class} (Confidence: {prediction.confidence})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right side - Billing summary */}
            <div className="w-1/2 p-8 bg-white">
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
                <div className="border-t border-gray-300 mt-8 pt-4 flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                </div>
                <button className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg text-2xl">
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default Billing;
