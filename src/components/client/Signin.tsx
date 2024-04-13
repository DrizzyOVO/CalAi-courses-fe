"use client" 
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography, Box} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { userState } from '@/store/atoms/user'; 
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toast';
import { z } from "zod"; 
import { UserAuth } from '@/app/AuthContext';

const signinInput = z.object({ 
    email: z.string().max(50).min(5).email(), 
    password: z.string().min(2)
}); 

function Signin() {
    const router = useRouter(); 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useSetRecoilState(userState); 

    const { user, googleSignIn, emailPassSignIn, emailPassSignUp, signOut } = UserAuth();  

    const handleSignIn = async (email: string, password: string) => { 
        try { 
            await emailPassSignIn(email, password); 
            router.push("/courses");
        } catch(error) { 
            console.log(error); 
        }
    }

    return <div>   

        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center z-10">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Welcome to Coursera
                        </h1>
                        <h1 className="text-2xl xl:text-3xl font-extrabold mt-3">
                            Sign In
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

                                    // onClick={async () => {

                                    //     toast.success("Please hold on, while we connect to our backend"); 
                                        
                                    //     const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
                                    //         email: email,
                                    //         password: password
                                    //     }, {
                                    //         headers: {
                                    //             "Content-type": "application/json"
                                    //         }
                                    //     }); 
                                    //     // const data = res.data;
                                    //     if(res) { 
                                    
                                    //         if (res.data.message == "Logged in successfully"){

                                    //             localStorage.setItem("token", res.data.token);
                                    //             setUser({ 
                                    //                 userEmail: res.data.email,  
                                    //                 isLoading: false, 
                                    //                 userId: res.data.userId 
                                    //             })
                                    //             router.push("/courses");
                                    
                                    //         } else if (res.data.message == 'Invalid username or password' || "Incorrect password" ){ 
                                    
                                    //             toast.error('Invalid username or password') 
                                    //             setUser({ 
                                    //                 userEmail: null,   
                                    //                 isLoading: false, 
                                    //                 userId: null 
                                    //             })
                                    
                                    //         } else { 
                                    //             window.alert('Try again!');  
                                    //             setUser({ 
                                    //                 userEmail: null,   
                                    //                 isLoading: false, 
                                    //                 userId: null 
                                    //             })
                                    //         }
                                    //     } else { 
                                            
                                    //         window.alert('Try again!');  
                                    //         setUser({ 
                                    //             userEmail: null,   
                                    //             isLoading: false, 
                                    //             userId: null 
                                    //         })
                                    //     }
                                    // }}

                                    onClick={
                                        async () => {   

                                            try { 
                                                const parsedInput = signinInput.safeParse({email, password}); 
                                    
                                                if(!parsedInput.success) {
                                                    toast.error('invalid email / password \n password length more the 6 characters!')
                                                } else { 
                                                    await handleSignIn(email, password); 
                                                } 
                                
                                            } catch(error) { 
                                
                                                toast.error('something went wrong')  
                                
                                            }
                                
                                        }
                                    }

                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Sign In
                                    </span>
                                </button>

                                <p className="mt-6 mb-0 leading-normal text-sm text-center">Already have an account? <a href={'/signup'} className="font-bold text-indigo-700">Sign up</a></p> 

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
}

export default Signin;