import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff,Loader2 } from 'lucide-react';
import {Link} from 'react-router-dom';
import {AuthImagePattern} from '../components/AuthImagePattern';


const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  }); 

  const { login,isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left */}

      <div className='flex flex-cols justify-center items-center p-6 sm:p-12'>
          <div className='w-full max-w-md space-y-8'>
            {/* logo */}
            <div className='text-center mb-8'>
              <div className='flex items-center gap-2 group flex-col'>
                <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors '>
                  <MessageSquare className='size-6 text-primary'/>
                </div>
                <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
                <p className='text-base-content/60'>Sign In to your Account</p>
              </div>
            </div>

            {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            
            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <input
                  type='email'
                  className='input input-bordered w-full pl-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className='absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input input-bordered w-full pl-10 pr-10  focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition'
placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div className='absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <div
                  className='absolute inset-y-0 z-2 right-0 pr-3 flex items-center cursor-pointer  '
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='size-5 text-base-content/40' /> : <Eye className='size-5 text-base-content/40' />}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            
            <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin'/>
                  Loading...
                </>
              ) :(
                "Sign In"
              ) }
            </button>
          </form>
          {/* link for signin */}
          <div className='text-center'>
            <p className='text-base-content/60'>
              Don&apos;t have an account?{" "}
              <Link to='/signup' className='link link-primary'>
                Create Account
              </Link>
            </p>

          </div>
          </div>
      </div>

      {/* right */}

      <AuthImagePattern 
        title="Join our community"
        subtitle='connect with friends ,share moments,and stay in touch'
      />
    </div>
  )
}

export default LoginPage