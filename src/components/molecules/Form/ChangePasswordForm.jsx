import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'sonner';
import axios from 'axios';
import * as yup from 'yup';
import { backendUrl } from '../../../lib/config';

const ChangePasswordForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [showPasswordOne, setShowPasswordOne] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);

    // ✅ Validation schema using Yup
    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('New password is required'),
        confirmNewPassword: yup
            .string()
            .oneOf([yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm new password is required'),
    });

    useEffect(() => {
        setIsFormChanged(newPassword !== '' || confirmNewPassword !== '');
    }, [newPassword, confirmNewPassword]);

    const handleTogglePasswordOne = () => setShowPasswordOne(!showPasswordOne);
    const handleTogglePasswordTwo = () => setShowPasswordTwo(!showPasswordTwo);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);

            // ✅ Validate input fields
            await schema.validate({ newPassword, confirmNewPassword }, { abortEarly: false });

            // ✅ Retrieve the JWT token from localStorage
            const token = localStorage.getItem('hoomie');

            // ✅ Make the API request using Axios
            const response = await axios.put(
                `${backendUrl}homePage/changepassword`,
                { password: newPassword },
                { headers: { Authorization: `${token}` } }
            );

            if (response.data.status === 'S') {
                toast.success('Password successfully updated!');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                toast.error('Something went wrong!');
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err) => toast.error(err.message));
            } else {
                toast.error('Something went wrong!');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="py-4 px-10 flex flex-col gap-6 w-4/5">
            {/* New Password Field */}
            <div className="mb-4 flex flex-col relative">
                <label htmlFor="newPassword" className="text-sm mb-1">
                    New Password
                </label>
                <div className="relative flex items-center">
                    <input
                        type={showPasswordOne ? 'text' : 'password'}
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="rounded-lg border p-3 text-sm text-black outline-none flex-grow"
                    />
                    <button
                        type="button"
                        onClick={handleTogglePasswordOne}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    >
                        {showPasswordOne ? <AiFillEye size={25} color="#A6A6A6" /> : <AiFillEyeInvisible size={25} color="#A6A6A6" />}
                    </button>
                </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 flex flex-col relative">
                <label htmlFor="confirmNewPassword" className="text-sm mb-1">
                    Confirm New Password
                </label>
                <div className="relative flex items-center">
                    <input
                        type={showPasswordTwo ? 'text' : 'password'}
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="rounded-lg border p-3 text-sm text-black outline-none flex-grow"
                    />
                    <button type="button" onClick={handleTogglePasswordTwo} className="absolute top-1/2 right-2 transform -translate-y-1/2">
                        {showPasswordTwo ? <AiFillEye size={25} color="#A6A6A6" /> : <AiFillEyeInvisible size={25} color="#A6A6A6" />}
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="button"
                onClick={handleSubmit}
                className={`bg-[#252A31] text-white py-2 px-3 hover:bg-[#080808] rounded-md text-xs w-fit ${
                    isSubmitting || !isFormChanged ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting || !isFormChanged}
            >
                {isSubmitting ? 'Submitting...' : 'Change Password'}
            </button>
        </form>
    );
};

export default ChangePasswordForm;
