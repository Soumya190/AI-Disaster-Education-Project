import { NavLink, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import { googleAuth } from "./api";

const Signup = () => {
    const initialValues = {
        name: '',
        email: '',
        password: ''
    };

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

    const validateForm = () => {
        let tempErrors: Record<string, string> = {};

        if (!formValues.name.trim()) {
            tempErrors.name = "Full Name is required.";
        } else if (!nameRegex.test(formValues.name)) {
            tempErrors.name = "Name must contain only letters (min 2 characters).";
        }

        if (!formValues.email.trim()) {
            tempErrors.email = "Email address is required.";
        } else if (!emailRegex.test(formValues.email)) {
            tempErrors.email = "Please enter a valid email address.";
        }

        if (!formValues.password) {
            tempErrors.password = "Password is required.";
        } else if (!passwordRegex.test(formValues.password)) {
            tempErrors.password = "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        
      
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try {
               
                localStorage.setItem('user-info', JSON.stringify({
                    name: formValues.name,
                    email: formValues.email
                }));

               
                navigate('/Homepage'); 
            } catch (error) {
                console.error("Signup failed:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const authResponse = async (authResult: any) => {
        try {
            if (!authResult || !authResult.code) {
                console.warn("Google Authentication initialization was bypassed or aborted.");
                return;
            }

            setIsLoading(true);
            const result = await googleAuth(authResult.code);
            
            if (result?.data?.user) {
                const { email, name, image } = result.data.user;
                const token = result.data.token;
                const obj = { email, name, image, token };

                localStorage.setItem('user-info', JSON.stringify(obj));
                navigate('/dashboard');
            } else {
                throw new Error("Invalid payload structure returned from authentication endpoints.");
            }
        } catch (err) {
            console.error("Error generating auth credentials pipeline:", err); 
            alert("Authentication failed. Please verify your internet connection or backend endpoint routing.");
        } finally {
            setIsLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: authResponse,
        onError: authResponse,
        flow: 'auth-code'
    });

    return (
        <div className="relative min-h-screen bg-[#F2F2F2] font-sans flex flex-col overflow-x-hidden">
            <nav className="absolute top-8 left-8 z-20">
                <NavLink
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Return to Command Center
                </NavLink>
            </nav>

            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[120px]" />
            </div>

            <main className="flex-grow flex text-[#111045] items-center justify-center p-6 w-full">
                <div className="w-full max-w-[460px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-center mb-4">
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 mt-2 font-medium text-sm">Join the network and start building.</p>
                    </div>

                    <div className="bg-white p-7 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white/50">
                        <button 
                            type="button"
                            onClick={() => googleLogin()}
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

                        <form className="space-y-4 md:space-y-3" onSubmit={handleFormSubmit} noValidate>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formValues.name}
                                    onChange={handleForm}
                                    placeholder="Enter your name"
                                    className={`w-full px-5 py-3.5 md:py-2.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400 ${
                                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                                    }`}
                                />
                                {errors.name && <p className="text-xs text-red-500 ml-1 font-medium">{errors.name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formValues.email}
                                    onChange={handleForm}
                                    placeholder="name@company.com"
                                    className={`w-full px-5 py-3.5 md:py-2.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400 ${
                                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                                    }`}
                                />
                                {errors.email && <p className="text-xs text-red-500 ml-1 font-medium">{errors.email}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={handleForm}
                                    placeholder="••••••••"
                                    className={`w-full px-5 py-3.5 md:py-2.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400 ${
                                        errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
                                    }`}
                                />
                                {errors.password && <p className="text-xs text-red-500 ml-1 font-medium">{errors.password}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl shadow-xl shadow-blue-900/10 transition-all active:scale-[0.98] mt-4 disabled:opacity-50"
                            >
                                {isLoading ? "Creating Account..." : "Create Free Account"}
                            </button>
                        </form>
                    </div>

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

export default Signup;