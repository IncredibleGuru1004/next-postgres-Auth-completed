// components/AuthForm.js

import React, { useState } from 'react';
import Link from 'next/link';

function AuthForm({ onSubmit, handleGoogleSignIn, mode }) {
  const isLogin = mode === 'login';
  
  const [formFields, setFormFields] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const validateName = (name) => {
    return name.trim() !== "";
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !validateName(formFields.name)) {
      newErrors.name = "Name is required.";
    }

    if (!validateEmail(formFields.email)) {
      newErrors.email = "Email is invalid. Example: aaa@example.com";
    }

    if (!validatePassword(formFields.password)) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0; // No errors implies form is valid
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormFields({ ...formFields, [field]: value });

    // Validate field on change
    if (field === 'email') {
      if (!validateEmail(value)) {
        setErrors({ ...errors, email: "Email is invalid. Example: aaa@example.com" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    } else if (field === 'name' && !isLogin) {
      if (!validateName(value)) {
        setErrors({ ...errors, name: "Name is required." });
      } else {
        setErrors({ ...errors, name: "" });
      }
    } else if (field === 'password') {
      if (!validatePassword(value)) {
        setErrors({ ...errors, password: "Password must be at least 8 characters long." });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formFields);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={formFields.name}
                onChange={handleChange('name')}
                
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={formFields.email}
              onChange={handleChange('email')}
              
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={formFields.password}
              onChange={handleChange('password')}
              
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </div>
        </form>
        {isLogin && (
          <div className="mt-4 flex items-center justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </div>  
        )}
        <div className="mt-4 text-center">
          {isLogin ? (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register">Register</Link>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login">Login</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;