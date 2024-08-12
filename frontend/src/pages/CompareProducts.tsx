import React, { useState, useRef } from "react";
import CompareTable from "../components/ui/CompareTable";

const CompareProducts = () => {
    const [imageSrc1, setImageSrc1] = useState<string | null>(null);
    const [imageSrc2, setImageSrc2] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [activeCamera, setActiveCamera] = useState<1 | 2 | null>(null);
    const [isProduct1Captured, setIsProduct1Captured] = useState(false);
    const [isProduct2Captured, setIsProduct2Captured] = useState(false);

    const [showCompareTable, setShowCompareTable] = useState(false);

    const [class1, setClass1] = useState("");
    const [class2, setClass2] = useState("");


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

    const capturePhoto = (setImageSrc: React.Dispatch<React.SetStateAction<string | null>>, setCaptured: React.Dispatch<React.SetStateAction<boolean>>) => {
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
            }
        }
    };

    return (
        <div className="bg-black h-screen flex flex-col items-center">
            {showCompareTable ? (
                <CompareTable classone={class1} classtwo={class2} imageSrc1={imageSrc1} imageSrc2={imageSrc2} />
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
                                        ? capturePhoto(setImageSrc1, setIsProduct1Captured)
                                        : capturePhoto(setImageSrc2, setIsProduct2Captured)
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
                                onClick={() => setShowCompareTable(true)}
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