import React, { useState } from 'react'
import { signin } from '@/lib/auth'
import { authErrors } from '@/lib/firebase';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver} from "@hookform/resolvers/yup";
import { loginSchema } from '@/lib/schema';

export default function Login() {
    const {
      register, 
      handleSubmit, 
      formState: {errors},
    } = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
      resolver: yupResolver(loginSchema)
    });

    const [error, setError] = useState("");

    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => 
        setState({...state, [e.target.name]: e.target.value });

    const handleSignin = async (values) => {
        const {user, error} = await signin(values.email, values.password);
        
        if (error) {
            setError(authErrors[error.code]);
        } else {
            setError(null);
        }
    }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                  <h2 className="mt-6 text-center text-3xl text-white font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSignin}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <input  
                        id="email" 
                        {...register("email")} 
                        name="email" 
                        type="email" 
                        autoComplete="email" 
                        required 
                        className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address" 
                      />
                      {/* {errors.email && (
                        <span className="text-sm text-red-400">
                          {errors.email.message}
                        </span>
                      )} */}
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">Password</label>
                      <input 
                        id="password" 
                        {...register("password")} 
                        name="password" 
                        type="password" 
                        autoComplete="current-password" 
                        required 
                        className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" 
                      />
                      {/* {errors.password && (
                        <span className="text-sm text-red-400">
                          {errors.password.message}
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                    </div>
                  </div>
                  <div>
                    <button type="submit" onClick={handleSubmit(handleSignin)} className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
  )
}
