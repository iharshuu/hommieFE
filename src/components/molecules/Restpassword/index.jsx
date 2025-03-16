import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../../../lib/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {toast} from "sonner"
const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading , setLoader] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoader(true)
            try {
                const { password } = values;
                const response = await fetch(`${backendUrl}autentication/resetpassword/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: password }),
                });
                const data = await response.json()
                if (data.status === "S") {
                    console.log(data); // Log the response data to the console
                    // localStorage.setItem('hoomie', data.token);
                    toast.success("Sucessfully reset the password")
                    // Uncomment the following line to navigate to the dashboard upon successful password reset
                    navigate('/');
                }
                else {
                    console.log(data.message)
                    toast.error("Something went wrong")

                }
                setLoader(false)
            } catch (error) {
                console.log(error)
                setLoader(false)
            }
        },
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmVisibility = () => setShowConfirm(!showConfirm);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-lg px-10 py-8 mx-auto bg-blue-80 rounded-lg shadow-xl">
                <div className="mb-6 text-3xl font-semibold text-center text-gray-800">
                    Reset Your Password
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-4 pr-12 text-sm border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer">
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-4 pr-12 text-sm border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            <span onClick={toggleConfirmVisibility} className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer">
                                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                   
                    <button
                        type="submit"
                        className={`group flex items-center gap-3 bg-blue-600 text-white w-full px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none ${loading ? 'cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loader w-5 h-5 mx-auto border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <p className='mx-auto'>
                                    Set Password</p>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
