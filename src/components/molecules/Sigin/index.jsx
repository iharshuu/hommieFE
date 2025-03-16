import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'sonner';
import { backendUrl } from '../../../lib/config';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showPasswordSetup, setShowPasswordSetup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !name.trim()) {
      toast.error('Both Name and Email are required!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}autentication/signup_send_mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      console.log(response)
      if (response.ok) {
        toast.success('Password setup link sent to your email!');
        setShowPasswordSetup(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <style>
        {`
        .loader {
  border-width: 2px;
  border-radius: 50%;
}

        `}
    </style>
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300">
      {showPasswordSetup ? (
        <div className="flex flex-col justify-center mx-auto text-center">
          <h2 className="text-4xl font-bold mb-2 text-blue-800">Password Setup Link Sent</h2>
          <p className="mb-4 text-gray-700">Check your email for a link to set up your password.</p>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition focus:outline-none"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div className="flex w-full">
          {/* Left Section */}
          <div className="w-1/2 flex flex-col justify-center pl-20">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Welcome to Our Community!</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Join us to easily check and book your home stay with vacancies in real-time.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-1/2 flex flex-col justify-center pr-20">
            <h3 className="text-3xl font-semibold mb-6 text-blue-700">Sign Up to Discover Vacant Houses</h3>
            <form className="space-y-6">
              {/* Email Field */}
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <div>
              <button
  type="button"
  onClick={handleSubmit}
  className={`group flex items-center gap-3 bg-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none ${
    loading ? 'cursor-not-allowed' : ''
  }`}
  disabled={loading}
>
  {loading ? (
    <span className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
  ) : (
    <>
      Next
      <FaArrowRight
        className="text-white text-xl transform transition-transform duration-300 group-hover:translate-x-3 group-hover:scale-125"
      />
    </>
  )}
</button>


              </div>

              {/* Login Link */}
              <div className="text-gray-700 text-base">
                Already have an account?{' '}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Signup;
