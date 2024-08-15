import React from 'react';

// Sample JSON data
const itemsData = [
    { id: "001", name: "Rice", stock: 100, price: 150, expiryDate: "2024-12-31" },
    { id: "002", name: "Wheat Flour", stock: 50, price: 200, expiryDate: "2024-11-15" },
    { id: "003", name: "Sugar", stock: 75, price: 120, expiryDate: "2024-10-05" },
    { id: "004", name: "Salt", stock: 30, price: 250, expiryDate: "2024-09-25" },
    { id: "005", name: "Cooking Oil", stock: 200, price: 100, expiryDate: "2024-12-01" },
    { id: "006", name: "Pulses", stock: 120, price: 180, expiryDate: "2024-11-30" },
    { id: "007", name: "Tea", stock: 80, price: 220, expiryDate: "2024-08-31" },
    { id: "008", name: "Coffee", stock: 60, price: 300, expiryDate: "2024-10-20" },
    { id: "009", name: "Spices", stock: 90, price: 140, expiryDate: "2024-09-10" },
    { id: "010", name: "Biscuits", stock: 110, price: 160, expiryDate: "2024-12-15" }
];

const AdminItems = () => {
    return (
        <div>
            <div className="overflow-x-auto">
                <div className="flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-4/5">
                        <div className="">
                            <div className=" shadow-md border rounded my-6">
                                <table className='min-w-max w-full table-auto text-white'>
                                    <thead>
                                        <tr className=" leading-normal py-3 px-6 text-left cursor-pointer bg-gray-200 text-gray-600 uppercase">
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Stock</th>
                                            <th>Price (₹)</th>
                                            <th>Expiry Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemsData.map(item => (
                                            <tr className='border-b border-gray-200 hover:bg-gray-600 py-5 text-xl' key={item.id}>
                                                <td className='py-5' >{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.stock}</td>
                                                <td>{item.price}</td>
                                                <td>{item.expiryDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="flex flex-col items-center px-5 py-5  xs:flex-row xs:justify-between">
                                    <div className="flex items-center">
                                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                                </path>
                                            </svg>
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                                            1
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                            2
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                                            3
                                        </button>
                                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                            4
                                        </button>
                                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminItems;
