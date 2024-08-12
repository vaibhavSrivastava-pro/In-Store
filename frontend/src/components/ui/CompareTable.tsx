import React from 'react';

interface CompareTableProps {
    classone: string;
    classtwo: string;
    imageSrc1: string | null;
    imageSrc2: string | null;
}

const CompareTable: React.FC<CompareTableProps> = ({ classone, classtwo, imageSrc1, imageSrc2 }) => {
    return (
        <div className="mt-10 flex items-center justify-center space-x-4 p-10 border rounded-2xl ">
            <div className="flex flex-col items-center pr-7">
                <p className='text-2xl text-white mb-7 font-bold'>Product 1</p>
                {imageSrc1 && <img src={imageSrc1} alt="Product 1" className="w-64 h-64 rounded-lg shadow-lg" />}
                <div className='mt-5'>

                    <p className="text-white text-2xl mb-2">{classone}</p>
                </div>
            </div>
            <div className="flex flex-col items-center border-l-2 pl-7  ">
            <p className='text-2xl text-white mb-7 font-bold'>Product 2</p>

                {imageSrc2 && <img src={imageSrc2} alt="Product 2" className="w-64 h-64 rounded-lg shadow-lg" />}
                <div className='mt-5'>
                    <p className="text-white text-2xl mb-2">{classtwo}</p>

                </div>
            </div>
        </div>
    );
};

export default CompareTable;
