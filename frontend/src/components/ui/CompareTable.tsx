import React from 'react';
import ReactMarkdown from 'react-markdown'

interface CompareTableProps {
    classone: string;
    classtwo: string;
    imageSrc1: string | null;
    imageSrc2: string | null;
    classoneResponse: string;
    classtwoResponse: string;
}

const CompareTable: React.FC<CompareTableProps> = ({ classone, classtwo, imageSrc1, imageSrc2, classoneResponse, classtwoResponse }) => {
    return (
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-10 p-10 border rounded-2xl bg-black overflow-auto">
            <div className="flex flex-col items-center md:pr-7">
                <p className="text-2xl text-white mb-7 font-bold">Product 1</p>
                {imageSrc1 && <img src={imageSrc1} alt="Product 1" className="w-64 h-64 rounded-lg shadow-lg" />}
                <div className="mt-5 text-center md:text-left">
                    <p className="text-white text-2xl mb-2">{classone}</p>
                    <ReactMarkdown className="text-white text-lg whitespace-pre-wrap">
                        {classoneResponse}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="flex flex-col items-center md:border-l-2 md:pl-7">
                <p className="text-2xl text-white mb-7 font-bold">Product 2</p>
                {imageSrc2 && <img src={imageSrc2} alt="Product 2" className="w-64 h-64 rounded-lg shadow-lg" />}
                <div className="mt-5 text-center md:text-left">
                    <p className="text-white text-2xl mb-2">{classtwo}</p>
                    <ReactMarkdown className="text-white text-lg whitespace-pre-wrap">
                        {classtwoResponse}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );    
};

export default CompareTable;