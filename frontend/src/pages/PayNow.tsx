import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { FaQrcode, FaCreditCard, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';

const PayNow: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'qr'>('card');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePayment = () => {
        // Simulate payment processing
        setTimeout(() => {
            setPaymentSuccess(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white p-4">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h1>

                <div className="flex justify-center items-center space-x-4 mb-6">
                    <div 
                        className={`cursor-pointer p-4 rounded-lg flex flex-col items-center ${paymentMethod === 'qr' ? 'bg-gray-700' : ''}`} 
                        onClick={() => setPaymentMethod('qr')}
                    >
                        <FaQrcode size={32} />
                        <p className="text-sm mt-2">Scan QR</p>
                    </div>
                    <div 
                        className={`cursor-pointer p-4 rounded-lg flex flex-col items-center ${paymentMethod === 'upi' ? 'bg-gray-700' : ''}`} 
                        onClick={() => setPaymentMethod('upi')}
                    >
                        <FaMobileAlt size={32} />
                        <p className="text-sm mt-2">UPI</p>
                    </div>
                    <div 
                        className={`cursor-pointer p-4 rounded-lg flex flex-col items-center ${paymentMethod === 'card' ? 'bg-gray-700' : ''}`} 
                        onClick={() => setPaymentMethod('card')}
                    >
                        <FaCreditCard size={32} />
                        <p className="text-sm mt-2">Card</p>
                    </div>
                </div>

                {paymentSuccess ? (
                    <div className="flex flex-col items-center">
                        <FaCheckCircle size={64} className="text-green-500 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
                        <p className="text-gray-400 mb-4">Thank you for your purchase.</p>
                        <Button value="Go to Home" link="/" />
                    </div>
                ) : (
                    <>
                        {paymentMethod === 'card' && (
                            <div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="**** **** **** ****"
                                    />
                                </div>

                                <div className="mb-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">CVC</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="CVC"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">Name on Card</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'upi' && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Enter your UPI ID</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="example@upi"
                                />
                            </div>
                        )}

                        {paymentMethod === 'qr' && (
                            <div className="flex flex-col items-center mb-6">
                                <p className="text-gray-400 mb-4">Scan the QR code below with your payment app:</p>
                                <div className="w-48 h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                                    <FaQrcode size={128} className="text-gray-500" />
                                </div>
                            </div>
                        )}

                        <Button value="Pay Now" onClick={handlePayment} />
                    </>
                )}

                {!paymentSuccess && (
                    <p className="text-xs text-center text-gray-500 mt-6">
                        By clicking Pay Now, you agree to our <a href="#" className="underline">Terms and Conditions</a>.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PayNow;