import React, {useState} from 'react'
import { signup } from '@/lib/auth'
import { authErrors } from '@/lib/firebase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {signupSchema} from '../lib/schema';

export default function SignUp() {
    const {
        register,
        handleSubmit, 
        formState: {errors},
    } = useForm({
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
        },
        resolver: yupResolver(signupSchema)
    });

    const [error, setError] = useState("");

    const [state, setState] = useState({
        email: "",
        displayName: "",
        password: "",
    })


    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value });
    }

    const handleSignup = async (values) => {
        const {user, error} = await signup(values.displayName, values.email, values.password );

        if (error) {
            console.log(error.code);
            setError(authErrors[error.code]);
        } else {
            setError(null);
            console.log(user);
        }
    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* LOGO */}
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite    
          </a>
          {/* SIGNUP BOARD */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSignup}>
                {/* EMAIL FORM */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input 
                    type="email"  
                    name="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required 
                    {...register("email")}
                    />
                </div>
                {/* USER NAME FORM */}
                <div>
                  <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">displayName</label>
                  <input 
                    type="text"  
                    name="displayName" 
                    id="displayName" 
                    placeholder="displayName" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                    {...register("displayName")}
                    />
                </div>
                {/* PASSWORD FORM */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input 
                    type="password"  
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                    {...register("password")}
                    />
                </div>
                
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
