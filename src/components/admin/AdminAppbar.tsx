"use client" 
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAdminLoading } from "@/store/selectors/isAdminLoading";
import { adminEmailState } from "@/store/selectors/adminEmail";
import { adminState } from "@/store/atoms/admin"; 
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { UserAuth } from "@/app/AuthContext";
import { RingSpinner } from "react-spinners-kit";

function AdminAppbar() { 
    const navigate = useRouter();
    const adminLoading = useRecoilValue(isAdminLoading); 
    const adminEmail = useRecoilValue(adminEmailState); 
    const setAdmin = useSetRecoilState(adminState); 
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


        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('currentUser :- ' + currentUser?.email);
            if(currentUser?.email) {
                setAdmin({ 
                    isLoading: false, 
                    adminEmail: currentUser?.email, 
                })
            } else { 
                setAdmin({ 
                    isLoading: false, 
                    adminEmail: null, 
                })
            }
            });
            return () => unsubscribe();      
    
    };

    useEffect(() => {
        // async function smth() {

        //     const someone = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/me`, { 
        //         headers: {
        //             "Authorization": "Bearer " + localStorage.getItem("token")
        //         }
        //     }); 

        //     if(someone){ 

                // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                //     console.log('currentUser :- ' + currentUser?.email);
                //     if(currentUser?.email) {
                //         setUser({ 
                //             isLoading: false, 
                //             userEmail: currentUser?.email, 
                //             userId: someone.data.userId
                //         })
                //     } else { 
                //         setUser({ 
                //             isLoading: false, 
                //             userEmail: null, 
                //             userId: null 
                //         })
                //     }
                // });

        //         setAdmin({ 
        //             isLoading: false, 
        //             adminEmail: someone.data.email,  
        //             adminId: someone.data.userId 
        //         });
        //     } else { 
        //         setAdmin({ 
        //             isLoading: false, 
        //             adminEmail: null,  
        //             adminId: null 
        //         })
        //     }
        // }
        // smth(); 

        init(); 

    }, [setAdmin]); 

    // className="block w-64 select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-3 px-6 text-center align-middle font-sans text-lg font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"

    if(adminLoading) { 
        <div className="spinner">
            <RingSpinner size={50} color="yellow"
                loading={adminLoading} />
        </div>
    }

    if (adminEmail) { 
        return  <div className={`mb-20`}>
        <div className='shadow-md w-full fixed top-0 left-0 z-50'>
            <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>

            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="#4f46e5" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                <span onClick={() => navigate.push('/adminui')}>Coursera</span>

            </div>

            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon/> : <Bars3BottomRightIcon />
                }
            </div>

            <ul className={`z-[-1] md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-gray-100 ${open ? 'top-12' : 'top-[-490px]'}`}>

                    {/* <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <Button
                            onClick={() => {
                                navigate.push("/courses") 
                            }}
                        >My Courses</Button>
                    </li> */}

                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-transparent from-indigo-700 to-indigo-500 py-2 px-2 text-center align-middle font-sans text-lg uppercase text-indigo-700 shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                navigate.push("/adminui/courses") 
                            }}
                        >MY COURSES</button>
                    </li>

                    {/* <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <Button
                            onClick={() => {
                                navigate.push("/addcourse") 
                            }}
                        >Create Course</Button>
                    </li> */}


                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-transparent from-indigo-700 to-indigo-500 py-2 px-2 text-center align-middle font-sans text-lg uppercase text-indigo-700 shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                navigate.push("/adminui/addcourse") 
                            }}
                        >CREATE COURSE</button>
                    </li>

                    {/* <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                // @ts-ignore 
                                localStorage.setItem("token", null);
                                setAdmin({  
                                    isLoading: false, 
                                    adminEmail: null,  
                                    adminId: null 
                                })
                                navigate.push("http://localhost:4000") 
                            }}
                        >Logout</Button>
                    </li> */}

                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <button
                            className="font-semibold w-auto select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-2 px-4 text-center align-middle font-sans text-lg uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                handleSignOut(); 
                                setAdmin({  
                                    isLoading: false, 
                                    adminEmail: null, 
                                })
                                navigate.push("/adminui") 
                            }}
                        >Logout</button>
                    </li>

            </ul>

            </div>
            </div>
            </div>




    } else {
        return <div className={`mb-20`}>
            
        <div className='shadow-md w-full fixed top-0 left-0 z-50'>
        <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>

        <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="#4f46e5" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <span onClick={() => navigate.push('/adminui')}>Coursera</span>

        </div>

        <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
            {
                open ? <XMarkIcon/> : <Bars3BottomRightIcon />
            }
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-gray-100 ${open ? 'top-12' : 'top-[-490px]'}`}>
            
                {/* <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate.push("/signup") 
                        }}
                    >Signup</Button>
                </li> */}

                <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                    <button
                        className="font-semibold w-auto select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-2 px-4 text-center align-middle font-sans text-lg uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                        onClick={() => {
                            navigate.push("/adminui/signup") 
                        }}
                    >SIGNUP</button>
                </li>

                {/* <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate.push("/signin")
                        }}
                    >Signin</Button>
                </li> */}

                <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                    <button
                        className="font-semibold w-auto select-none rounded-2xl bg-transparent from-indigo-700 to-indigo-500 py-2 px-4 text-center align-middle font-sans text-lg uppercase text-indigo-700 shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                        onClick={() => {
                            navigate.push("/adminui/signin")
                        }}
                    >SIGNIN</button>
                </li>
            
        </ul>

        </div>

        </div>
        </div>




    }
}

export default AdminAppbar; 






// import {Typography} from "@mui/material";
// import Button from "@mui/material/Button";
// import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation'
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import { isUserLoading } from "@repo/store/src/selectors/isUserLoading"; 
// import { userEmailState } from "@repo/store/src/selectors/userEmail"; 
// import { userState } from "@repo/store/src/atoms/user";
// import { navState } from "@repo/store/src/atoms/navbar"; 
// import { navOpenState } from "@repo/store/src/selectors/navIsOpen"; 
// import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
// import axios from "axios";

// function Appbar() {
//     const navigate = useRouter();
//     const userLoading = useRecoilValue(isUserLoading); 
//     const userEmail = useRecoilValue(userEmailState); 
//     const setUser = useSetRecoilState(userState); 
//     const [open, setOpen] = useState(false);

//     useEffect(() => {
//         async function smth() {

//             const someone = await axios.get("http://localhost:5000/user/me", { 
//                 headers: {
//                     "Authorization": "Bearer " + localStorage.getItem("token")
//                 }
//             }); 

//             if(someone){ 
//                 setUser({ 
//                     isLoading: false, 
//                     userEmail: someone.data.email, 
//                     userId: someone.data.userId
//                 });
//             } else { 
//                 setUser({ 
//                     isLoading: false, 
//                     userEmail: null, 
//                     userId: null
//                 })
//             }
//         }
//         smth(); 

//     }, []);

//     if (userEmail) {

//         return  <div className={`mb-20`}>
//         <div className='shadow-md w-full fixed top-0 left-0 pb-10 z-50'>
//             <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>

//             <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>

//                 <svg xmlns="http://www.w3.org/2000/svg" fill="#4f46e5" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
//                 </svg>
//                 <span>Coursera</span>

//             </div>

//             <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
//                 {
//                     open ? <XMarkIcon/> : <Bars3BottomRightIcon />
//                 }
//             </div>
//             {/* z-[-1] */}
//             {/* ${open ? 'top-12' : 'top-[-490px]'} */}
//             <ul className={`z-[-1] md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-gray-100 ${open ? 'top-12' : 'top-[-490px]'}`}>

//                     <li className='md:ml-8 md:my-0 my-7 font-semibold'>
//                         <Button
//                             onClick={() => {
//                                 navigate.push("/purchased")  
//                             }}
//                         >Purchased</Button>
//                     </li>

//                     <li className='md:ml-8 md:my-0 my-7 font-semibold'>
//                         <Button
//                             onClick={() => {
//                                 navigate.push("/courses") 
//                             }}
//                         >Courses</Button>
//                     </li>

//                     <li className='md:ml-8 md:my-0 my-7 font-semibold'>
//                         <Button
//                             variant={"contained"}
//                             onClick={() => {
//                                 // @ts-ignore 
//                                 localStorage.setItem("token", null);
//                                 setUser({ 
//                                     isLoading: false, 
//                                     userEmail: null, 
//                                     userId: null
//                                 })
//                                 navigate.push("/") 
//                             }}
//                         >Logout</Button>
//                     </li>

//             </ul>

//             </div>
//             </div>
//             </div>


//     } else {

//         return ( <div className={`mb-20`}>
    
//             <div className='shadow-md w-full fixed top-0 left-0 pb-10 z-50'>
//             <div className='md:flex items-center justify-between bg-gray-100 py-4 md:px-10 px-7'>

//             <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>

//                 <svg xmlns="http://www.w3.org/2000/svg" fill="#4f46e5" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
//                 </svg>
//                 <span>Coursera</span>

//             </div>

//             <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
//                 {
//                     open ? <XMarkIcon/> : <Bars3BottomRightIcon />
//                 }
//             </div>

//             <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-gray-100 ${open ? 'top-12' : 'top-[-490px]'}`}>
                
//                     <li className='md:ml-8 md:my-0 my-7 font-semibold'>
//                         <Button
//                             variant={"contained"}
//                             onClick={() => {
//                                 navigate.push("/signup") 
//                             }}
//                         >Signup</Button>
//                     </li>

//                     <li className='md:ml-8 md:my-0 my-7 font-semibold'>
//                         <Button
//                             variant={"contained"}
//                             onClick={() => {
//                                 navigate.push("/signin")
//                             }}
//                         >Signin</Button>
//                     </li>
                
//             </ul>

//             </div>
//             </div>
//             </div>
//         )

//     }



// }

// export default Appbar;





