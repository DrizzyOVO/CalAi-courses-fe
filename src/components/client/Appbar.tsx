"use client" 
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "@/store/selectors/isUserLoading"; 
import { userEmailState } from "@/store/selectors/userEmail"; 
import { userState } from "@/store/atoms/user"; 
import { navState } from "@/store/atoms/navbar"; 
import { navOpenState } from "@/store/selectors/navIsOpen"; 

import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import toast, { Toaster } from "react-hot-toast";

import {
    PushSpinner, TraceSpinner, RainbowSpinner,
    RingSpinner, SwishSpinner, PongSpinner,
    MetroSpinner, JellyfishSpinner
} from "react-spinners-kit";
import { UserAuth } from "@/app/AuthContext";

function Appbar() {
    const navigate = useRouter();
    const userLoading = useRecoilValue(isUserLoading); 
    const userEmail = useRecoilValue(userEmailState); 
    const setUser = useSetRecoilState(userState); 
    const [open, setOpen] = useState(false);
    const { logOut } = UserAuth(); 

    const handleSignOut = async () => {
        try {   
            await logOut(); 
        } catch(error) { 
            console.log(error);     
        }
    }

    const init = async () => {
        console.log("userEmail :- " + userEmail);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('currentUser :- ' + currentUser?.email);
            console.log("hehe :- " + currentUser?.email);
            if(currentUser?.email) {
                setUser({ 
                    isLoading: false, 
                    userEmail: currentUser?.email
                })
            } else { 
                setUser({ 
                    isLoading: false, 
                    userEmail: null
                })
                navigate.push('/');
            }
        });
        return () => unsubscribe();

        
    
    };

    useEffect(() => {
        init(); 
    }, [setUser]); 

    if(userLoading) { 
        <div className="spinner">
            <RingSpinner size={50} color="yellow"
                loading={userLoading} />
        </div>
    }

    if (userEmail) {

        return  <div className={`mb-20`}>
        <div className='shadow-md w-full fixed top-0 left-0 z-50'>
            <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>

            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="#4f46e5" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <span
                    onClick={() => {
                        navigate.push("/")
                    }}
                >Coursera</span>

            </div>

            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon/> : <Bars3BottomRightIcon />
                }
            </div>

            <ul className={`z-[-1] md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-gray-100 ${open ? 'top-12' : 'top-[-490px]'}`}>

                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-transparent from-indigo-700 to-indigo-500 py-2 px-2 text-center align-middle font-sans text-lg uppercase text-indigo-700 shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                navigate.push("/purchased") 
                            }}
                        >PURCHASED</button>
                    </li>


                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-transparent from-indigo-700 to-indigo-500 py-2 px-2 text-center align-middle font-sans text-lg uppercase text-indigo-700 shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                navigate.push("/courses") 
                            }}
                        >COURSES</button>
                    </li>


                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-2 px-4 text-center align-middle font-sans text-lg uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                handleSignOut(); 
                                setUser({ 
                                    isLoading: false, 
                                    userEmail: null
                                })
                                navigate.push("/") 
                            }}
                        >Logout</button>
                    </li>

            </ul>

            </div>
            </div>
            </div>


    } else {

        return ( <div className={`mb-20`}>
    
            <div className='shadow-md w-full fixed top-0 left-0 z-50'>
            <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>

            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'> 

                <svg xmlns="http://www.w3.org/2000/svg" fill="#4f46e5" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" style={{ marginLeft: "10px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <span
                    onClick={() => {
                        navigate.push("/")
                    }}
                >Coursera</span>

            </div>

            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7' >
                {
                    open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                }
            </div>

            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-gray-100 ${open ? 'top-12' : 'top-[-490px]'}`}>

                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-2 px-4 text-center align-middle font-sans text-lg uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                navigate.push("/signup") 
                            }}
                        >SIGNUP</button>
                    </li>

                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-transparent from-indigo-700 to-indigo-500 py-2 px-4 text-center align-middle font-sans text-lg uppercase text-indigo-700 shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                navigate.push("/signin")
                            }}
                        >SIGNIN</button>
                    </li>
                
            </ul>

            </div>
            </div>
            </div>
        )

    }



}

export default Appbar;


// #4338ca indigo-700
// #4f46e5 indigo-600 
