
// import Link from "next/link";
import { NavLink } from "react-router-dom";
// import { useSearchParams } from "next/navigation";
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from "react";
import axios from 'axios';

const Login = () => {
    // const [values, setValues] = useState({
    //     name: '',
    //     email: '',
    //     password: "",
    // })

    // const handleForm = (e: any) => {
    //     setValues({ ...values, [e.target.name]: e.target.value })
    // }

    const authResponse=async(authResult:any)=>{
        try{
            console.log(authResult);
        }
        catch(err){
            console.log(err); 
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess:authResponse,
        onError:authResponse,
        flow:'auth-code'
    })

    return (
        <div className="relative min-h-screen bg-[#f8fafc] font-sans flex flex-col overflow-x-hidden">
            
            {/* 1. Floating Navigation - Isolated from the main flex flow */}
            <nav className="absolute top-8 left-8 z-20">
                    <NavLink
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Return to Command Center
                    </NavLink>
                </nav>

            {/* 2. Background Elements - Fixed or Absolute to prevent layout shift */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[120px]" />
            </div>

            {/* 3. Main Centering Container */}
            <main className="flex-grow flex items-center justify-center p-6 w-full">
                <div className="w-full max-w-[460px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    {/* Header Section */}
                    <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-15 md:w-15 md:h-15 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl shadow-blue-200 text-white text-3xl md:text-4xl mb-6 transform hover:rotate-6 transition-transform">
                            🛡️
                        </div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 mt-2 font-medium text-sm">Join the network and start building.</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white p-7 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white/50">
                        
                        {/* Google Button */}
                        <button 
                            onClick={() => 
                            googleLogin()
                        }
                            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-2.5 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className="w-5 h-5" />
                            <span>Sign up with Google</span>
                        </button>

                        <div className="relative my-4 text-center">
                            <hr className="border-slate-100" />
                            <span className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[8.6px] font-black text-slate-400 uppercase tracking-widest">
                                Or continue with email
                            </span>
                        </div>

                        {/* <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={values.name}
                                    onChange={handleForm}
                                    placeholder="Enter your name"
                                    className="w-full px-5 py-3.5 md:py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={values.email}
                                    onChange={handleForm}
                                    placeholder="name@company.com"
                                    className="w-full px-5 py-3.5 md:py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={values.password}
                                    onChange={handleForm}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3.5 md:py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <button type="submit" className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl shadow-xl shadow-blue-900/10 transition-all active:scale-[0.98] mt-4">
                                Create Free Account
                            </button>
                        </form> */}
                    </div>

                    {/* Footer */}
                    <p className="text-center mt-8 text-slate-500 font-medium">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                            Sign In
                        </NavLink>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;