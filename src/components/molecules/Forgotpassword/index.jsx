import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lock from "../../../assets/image/ForgotPassword/lock.jpeg"
import { backendUrl } from '../../../lib/config';
import {toast} from "sonner"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [showPasswordSetup, setShowPasswordSetup] = useState(false);


    const handleSubmit = async () => {
        try {
            const response = await fetch(`${backendUrl}autentication/reset_send_mail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            console.log(response)

            let data = response.json()


            if (response.ok) {
                setShowPasswordSetup(true);
                toast.success("reset link sent successfully ")

            } else {
                // Handle error cases
                toast.error("user doesn't exists")
            }
        } catch (error) {
            // Handle fetch error
            toast.error("Something went wrong !!")

        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {showPasswordSetup ? (
                <div className="flex flex-col justify-center mx-auto">
                    <h2 className="text-4xl font-bold mb-2 text-blue-800">Password Reset Link Sent</h2>
                    <p className="mb-4">A password Reset link has been sent to your email address.</p>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700" onClick={() => navigate("/login")}>
                        Go to Login
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col items-center">
                        {/* <img src='https://files.oaiusercontent.com/file-VlfpaZGiYQWcqt0WwmzJdUNL?se=2024-03-03T12%3A56%3A20Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D299%2C%20immutable&rscd=attachment%3B%20filename%3Df0233fde-6bd2-411d-a8e6-44f7998b6b3b&sig=i/x8kTPjN7frkzvRz/87vKM4Fcl743UeMc5yDpbbBOs%3D' /> */}
                        <img src={lock} alt="lock" />
                        <h2 className="mt-4 text-xl font-bold text-center text-gray-900">Trouble Logging In?</h2>
                        <p className="mt-2 text-base text-center text-gray-600">
                            Enter your email and we'll send you a link to get back into your account.
                        </p>
                    </div>

                    <div className="mt-8">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="john@hostel.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mt-1 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mt-6" onClick={handleSubmit}>
                        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Send Login Link
                        </button>
                    </div>

                    <div className="mt-6 text-sm text-center cursor-pointer" onClick={()=>navigate("/signup")}>
                        <span className="text-gray-600">Create a new account </span>
                    </div>
                    <div className="mt-6 text-sm text-center cursor-pointer" onClick={()=>navigate("/")}>
                        <span className="text-gray-600">Log in</span>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}

export default ForgotPassword;
