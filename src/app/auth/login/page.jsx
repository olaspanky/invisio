"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import fetchWrapper from '../../utils/fetchWrapper';

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidPhone = (value) =>
    /^\+?\d{10,15}$/.test(value);

  const validate = () => {
    const newErrors = {};
    if (!form.identifier) {
      newErrors.identifier = 'Email or phone number is required';
    } else if (!isValidEmail(form.identifier) && !isValidPhone(form.identifier)) {
      newErrors.identifier = 'Enter a valid email or phone number';
    }

    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetchWrapper.post(
        'https://invisio.pbr.com.ng/api/v1/login',
       
        form
      );
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Login failed. Please try again.');
      } else {
        const token = data?.data?.token;
        if (!token) {
          setServerError('No token received. Please contact support.');
          return;
        }

        localStorage.setItem('token', token);
        router.push('/');
      }
    } catch (error) {
      setServerError(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/assets/pharmacist.jpg')",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(222.07deg, rgba(55, 62, 231, 0.85) 8.26%, rgba(61, 132, 237, 0.85) 91.03%)",
        }}
      ></div>

      <div className="absolute top-6 left-6 z-10">
        <img
          src="/assets/pbg-logo-white.png"
          alt="Logo"
          className="h-[70px] w-auto"
        />
      </div>

      <div className="relative w-full  max-w-[785px] z-10">
        {/* Welcome header OUTSIDE the login box */}
        <div className="mb-4 text-center text-white">
          <h1 className="text-4xl mb-4 font-bold">Welcome to INVISIO™</h1>
          <p className="text-[20px]">
            Uncover access to real-world diagnosis and prescription data that
            uncover unprecedented insight into the life science landscape.
          </p>
        </div>

        {/* Login card */}
        <div className="max-w-md mx-auto justify-center flex flex-col w-full   p-8 rounded-2xl text-white text-center ">
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
            <label className="block mb-1 text-sm font-medium text-white">
                Email or Phone Number
              </label>
              <input
                type="text"
                value={form.identifier}
                onChange={(e) =>
                  setForm({ ...form, identifier: e.target.value })
                }
                placeholder="Email or phone number"
                className="w-full px-4 py-2 bg-none h-[56px] rounded-[12px] border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFFFFF] placeholder-white"
                style={{
    WebkitTextFillColor: "#ffffff",
    WebkitBoxShadow: "0 0 0 1000px transparent inset",
    transition: "background-color 5000s ease-in-out 0s",
  }}
              />
              {errors.identifier && (
                <p className="text-red-700 text-sm mt-1">{errors.identifier}</p>
              )}
            </div>

            <div>
            <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-white">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-white hover:underline"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                 type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Password"
                style={{
    WebkitTextFillColor: "#ffffff",
    WebkitBoxShadow: "0 0 0 1000px transparent inset",
    transition: "background-color 5000s ease-in-out 0s",
  }}
                className="w-full px-4 py-2 h-[56px] rounded-[12px] border border-[#FFFFFF59] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFFFFF] placeholder-white bg-transparent"
              />
              {errors.password && (
                <p className="text-red-700 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <h5 className="text-[14px] text-[#FFFFFF]">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </h5>
            </div>
            <div className="flex items-center text-sm mt-2 text-white">
              <input type="checkbox" className="mr-2" />
              <span>Agree to Terms of Use</span>
            </div>

            {serverError && (
              <p className="text-red-700 text-sm mt-2">{serverError}</p>
            )}

           <div className="w-full flex  justify-center ">
           <button
              type="submit"
              disabled={loading}
              className="w-[250px] h-[64px] bg-[#000A48]  hover:bg-blue-700 transition-colors py-2 rounded-md font-semibold disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
           </div>
          </form>

          <p className="text-xs mt-4 text-white text-center">
          Forgot password?{" "}
            <a
              href="/auth/forgot-password"
              className="underline text-white hover:text-blue-300"
            >
             Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
