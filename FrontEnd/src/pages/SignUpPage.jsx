import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff,Loader2 } from 'lucide-react';
import {Link} from 'react-router-dom';
import {AuthImagePattern} from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {

  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });

  const {signup,isSigningUp} = useAuthStore();

  const validateForm=()=>{

    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!formData.password.trim()) return toast.error("Password is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error("Invalid email format");
    if(formData.password.length <6) return toast.error("Password must be at least 6 characters long");


    return true;

  };

  const handleSubmit = (e)=>{
    e.preventDefault();

    const success = validateForm();

    if(success === true ) signup(formData);
  };

  return (
    
    <div className='min-h-screen grid lg:grid-cols-2 mt-5 '>
      {/* left */}

      <div className='flex flex-cols justify-center items-center p-6 sm:p-12'>
          <div className='w-full max-w-md space-y-8'>
            {/* logo */}
            <div className='text-center mb-8'>
              <div className='flex items-center gap-2 group flex-col'>
                <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors '>
                  <MessageSquare className='size-6 text-primary'/>
                </div>
                <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                <p className='text-base-content/60'>Get started with your free account</p>
              </div>
            </div>

            {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Full Name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                
                  <input
                    type='text'
                    className='input input-bordered w-full pl-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition'
                    placeholder='John Doe'
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  <div className='absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='size-5 text-base-content/40' />
                  </div>
              </div>
            </div>

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
            
            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className='size-5 animate-spin'/>
                  Loading...
                </>
              ) :(
                "Create Account"
              ) }
            </button>
          </form>
          {/* link for signin */}
          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{" "}
              <Link to='/login' className='link link-primary'>
                Log in
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


export default SignUpPage;