"use client" 
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/atoms/user';
import { toast } from 'react-toast';
import { UserAuth } from '@/app/AuthContext';

function Signup() {
    const router = useRouter(); 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useSetRecoilState(userState); 
    const { emailPassSignUp, emailPassSignIn, googleSignIn } = UserAuth();

    const handleSignUp = async (email: string, password: string) => { 
        // createUserWithEmailAndPassword(auth, email, password);
        try { 
            await emailPassSignUp(email, password); 
            router.push("/courses");
        } catch(error) { 
            console.log(error); 
        }
    };

    const handleSignInOnSignUp = async (email: string, password: string) => { 
        try {   
            await emailPassSignIn(email, password);  
        } catch (error) { 
            console.log(error); 
        }
    }

return (
    <div>   

        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Welcome to Coursera
                        </h1>
                        <h1 className="text-2xl xl:text-3xl font-extrabold mt-3">
                            Sign up
                        </h1>
                        <div className="w-full flex-1 mt-8">

                            <div className="mx-auto max-w-xs">
                                <input
                                    onChange={(evant11) => {
                                        let elemt = evant11.target;
                                        setEmail(elemt.value);
                                    }}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email" placeholder="Email" />
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password" />
                                <button

                                    onClick={async() => {

                                        toast.success("Please hold on, while we connect to our backend"); 

                                        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, {
                                            email: email,
                                            password: password
                                        })
                                        
                                        if (response) { 
                
                                            if(response.data.error){
                                                toast.error('Invalid input :( \nemail length should be between 5-30 \npassword length should be between 7-30') 
                                            }
                
                                            else if (response.data.message == 'User already exists'){  
                                                let data = response.data;
                                                await handleSignInOnSignUp(email, password);  
                                                setUser({ 
                                                    isLoading: false, 
                                                    userEmail: data.email
                                                }); 
                                                router.push("/");
                                            } else if (response.data.message == 'Created user sucessfully') {

                                                await handleSignUp(email, password); 
                                                await handleSignInOnSignUp(email, password); 

                                            } else if (response.data.message == "Incorrect password"){
                                                toast.error('Incorrect Password')
                                                setUser({ 
                                                    isLoading: false, 
                                                    userEmail: null
                                                }); 
                                            } else {
                                                toast.error("Try again.")
                                                setUser({ 
                                                    isLoading: false, 
                                                    userEmail: null
                                                }); 
                                                router.push("/singup");
                                            } 
                
                                        } else { 
                                            toast.error('Try again!')
                                            router.push("/singup");
                                        }
                                    }}

                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Sign Up
                                    </span>
                                </button>

                                <p className="mt-6 mb-0 leading-normal text-sm text-center">Already have an account? <a href={'/signin'} className="font-bold text-indigo-700">Sign in</a></p> 

                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by Coursera&apos;s
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                    &nbsp;Terms of Service
                                    </a>
                                    &nbsp;and its
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                    &nbsp;Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{backgroundImage: "url(/stdLogin.png)"}}>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )

}

export default Signup;
// https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?w=740