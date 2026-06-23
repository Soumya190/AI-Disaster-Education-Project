
// import Link from "next/link";
import { NavLink } from "react-router-dom";
// import { useSearchParams } from "next/navigation";
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from "react";
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: "",
    })

    const handleForm = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

   const handleSubmit= ()=>{
    
   }

    return (
        <>
            <div className="min-h-screen bg-[#F2F2F2] relative overflow-hidden font-sans">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px]" />
                </div>

                {/* Top Navigation */}
                <nav className="absolute top-8 left-8 z-20">
                    <NavLink
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Return to Command Center
                    </NavLink>
                </nav>

                {/* Main Content Container */}
                <main className="flex items-center justify-center min-h-screen p-6">
                    <div className="w-full max-w-[460px] animate-in fade-in zoom-in duration-500">

                        {/* Logo / Branding */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-200 text-white text-4xl mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                🛡️
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Secure access to your mission dashboard
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white">
                            <form className="space-y-6" onSubmit={handleSubmit}>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleForm}
                                        placeholder="name@company.com"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-sm font-bold text-slate-700">Password</label>
                                        <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                                            Forgot?
                                        </button>
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleForm}
                                        placeholder="••••••••"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98] mt-2"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>

                        {/* Footer Link */}
                        <p className="text-center mt-10 text-slate-500 font-medium">
                            Don&apos;t have an account?{" "}
                            <NavLink to="/signup" className="text-blue-600 font-bold hover:text-blue-700 hover:underline underline-offset-4 transition-colors">
                                Create one for free
                            </NavLink>
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Login;