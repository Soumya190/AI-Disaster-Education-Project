import { googleLoginApi, loginData } from "./api";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await loginData(values);
            const responseData = response?.data ? response.data : response;

            if (responseData && responseData.token) {
                localStorage.setItem('token', responseData.token);

                const sessionData = {
                    token: responseData.token,
                    name: responseData.user?.name,
                    email: responseData.user?.email,
                    image: responseData.user?.profilePic || responseData.user?.image || ""
                };

                localStorage.setItem('user-info', JSON.stringify(sessionData));
                navigate('/homepage');
            } else {
                throw new Error("Invalid response structure.");
            }
        } catch (err: any) {
            console.error("Login failed:", err);
            const errorMessage = err?.response?.data?.message || err?.message || "Login failed. Please check your credentials.";
            alert(errorMessage);
        } finally {
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
            const result = await googleLoginApi(authResult.code);
            const responseData = result?.data ? result.data : result;

            if (responseData && responseData.token) {
                localStorage.setItem('token', responseData.token);

                const sessionData = {
                    token: responseData.token,
                    name: responseData.user?.name,
                    email: responseData.user?.email,
                    image: responseData.user?.profilePic || responseData.user?.image || ""
                };

                localStorage.setItem('user-info', JSON.stringify(sessionData));
                navigate('/homepage');
            } else {
                throw new Error("Invalid payload structure returned from authentication endpoints.");
            }
        }
        catch (err: any) {
            console.error("Error generating auth credentials pipeline:", err);
            const errorMessage = err?.response?.data?.message || "Authentication failed. Please verify your credentials or sign up first.";
            alert(errorMessage);
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
        <>
            <div className="min-h-screen bg-[#F2F2F2] relative overflow-hidden font-sans">
               
                <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px]" />
                </div>
              
                <nav className="absolute top-8 left-8 z-20">
                    <NavLink
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Return to Command Center
                    </NavLink>
                </nav>
                
                <main className="flex items-center justify-center min-h-screen p-6">
                    <div className="w-full max-w-[460px] animate-in fade-in zoom-in duration-500">
                        
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                                Welcome Back
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Secure access to your mission dashboard
                            </p>
                        </div>
                    
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white">
                            <form className="space-y-6" onSubmit={handleSubmit}>

                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => googleLogin()}
                                        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-2.5 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className="w-5 h-5" />
                                        <span>{isLoading ? "Connecting..." : "Sign in with Google"}</span>
                                    </button>

                                    <div className="relative my-6 text-center">
                                        <hr className="border-slate-200" />
                                        <span className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F2F2F2] px-4 text-[8.6px] font-black text-slate-400 uppercase tracking-widest">
                                            Or continue with email
                                        </span>
                                    </div>
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
                                    disabled={isLoading}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98] mt-2 disabled:opacity-50"
                                >
                                    {isLoading ? "Verifying..." : "Sign In"}
                                </button>
                            </form>
                        </div>
                    
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