"use client";

import { useState } from 'react';
import AuthLayout from '../../components/Auth/AuthLayout';
import Input from '../../components/Auth/Input';
import Button from '../../components/Button/Button';
import Link from 'next/link';
import fetchWrapper from '../../utils/fetchWrapper';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
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
    console.log(form)
   
    try {
      const res = await fetchWrapper.post('https://invisio.api.pbr.com.ng/api/v1/login', form);
  const data = await res.json();

  if (!res.ok) {
    setServerError(data.error || "Login failed. Please try again.");
  } else {
    const token = data?.data?.token;
    if (!token) {
      setServerError("No token received. Please contact support.");
      return;
    }

    localStorage.setItem("token", token);
    router.push("/");
  }
    } catch (error) {
      setServerError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email or Phone"
          name="identifier"
          value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
          error={errors.identifier}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
        />
        <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
         {serverError && (
          <p className="text-red-600 text-sm">{serverError}</p>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
        {/* <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div> */}
      </form>
    </AuthLayout>
  );
}