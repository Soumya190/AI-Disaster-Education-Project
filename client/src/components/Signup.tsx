import { NavLink, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import { signUpData, googleAuth } from "./api";

const Signup = () => {
    const initialValues = {
        name: '',
        email: '',
        password: ''
    };

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState({
        'name': '',
        'email': '',
        'password': ''
    })

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        setError(prev => ({ ...prev, [name]: '' }));
    }

    const validateForm = () => {
        let isValid = true;
        let newErrors = { name: '', email: '', password: '' };

        if (!formValues.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }
        if (!formValues.email.trim()) {
            newErrors.email = 'Email address is required';
            isValid = false;
        }
        else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formValues.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }
        else if (formValues.password.length < 6) {
            newErrors.password = "Password mush be atleast 6 characters";
            isValid = false;
        }

        setError(newErrors);
        return isValid;
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("=== 1. SUBMIT BUTTON CLICKED ==="); // This will tell us if the button works

        const isValid = validateForm();
        console.log("=== 2. FORM VALIDATION RESULT ===", isValid);
        if(!isValid) {
            console.log("Form validation failed. Stopping execution.");
            return;
        }

        setIsLoading(true);
        try {
            console.log("=== 3. CALLING signUpData API ===");
            const response = await signUpData(formValues);
            console.log("=== 4. RAW API RESPONSE ===", response);
            
            const responseData = response?.data ? response.data : response;
            console.log("=== 5. PROCESSED RESPONSE DATA ===", responseData);

            if (responseData && responseData.token) {
                localStorage.setItem('token', responseData.token);
                
                const sessionData = {
                    token: responseData.token,
                    name: responseData.user?.name,
                    email: responseData.user?.email,
                    image: responseData.user?.profilePic || responseData.user?.image || ""
                };
                
                localStorage.setItem('user-info', JSON.stringify(sessionData));
                console.log("=== 6. SAVED TO LOCALSTORAGE SUCCESSFULLY ===");
            } else {
                console.warn("=== WARNING: Token missing from responseData ===");
            }

            console.log("=== 7. NAVIGATING TO /homepage ===");
            navigate('/homepage');
        }
        catch(err: any) {
            console.error("=== CATCH BLOCK TRIGGERED ===", err);
            console.error("Error response details:", err?.response);
            
            const errorMessage = err?.response?.data?.message || err?.message || "";
            const statusCode = err?.response?.status;

            if (statusCode === 409 || (statusCode === 400 && errorMessage.toLowerCase().includes("email"))) {
                setError(prev => ({
                    ...prev,
                    email: "This email is already registered. Please log in instead."
                }));
            } else {
                alert(errorMessage || "Something went wrong during signup.");
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    const authResponse = async (authResult: any) => {
        try {
            if (!authResult || !authResult.code) {
                console.warn("Google Authentication initialization was bypassed or aborted.");
                return;
            }

            setIsLoading(true);

            const response = await googleAuth(authResult.code);

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);

                const sessionData = {
                    token: response.data.token,
                    name: response.data.user?.name,
                    email: response.data.user?.email,
                    image: response.data.user?.profilePic || response.data.user?.image || ""
                };

                localStorage.setItem('user-info', JSON.stringify(sessionData));
                // Optionally store user data if needed:
                // localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            console.log("Attempting navigation to /homepage...");
            navigate('/homepage');
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
                                    type="name"
                                    autoComplete="off"
                                    name="name"
                                    id="name"
                                    value={formValues.name}
                                    onChange={handleForm}
                                    placeholder="Enter your name"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                                {error.name && <p className="text-xs text-red-500 ml-1 font-medium">{error.name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="off"
                                    id="email"
                                    value={formValues.email}
                                    onChange={handleForm}
                                    placeholder="name@company.com"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                                {error.email && <p className="text-xs text-red-500 ml-1 font-medium">{error.email}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={handleForm}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                />
                                {error.password && <p className="text-xs text-red-500 ml-1 font-medium">{error.password}</p>}
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