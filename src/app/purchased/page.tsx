"use client"
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { userState } from "@/store/atoms/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Appbar from "@/components/client/Appbar";
import { userEmailState } from "@/store/selectors/userEmail";


function PurchasedCourses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [email, setEmail] = useState(null); 
    const setUser = useSetRecoilState(userState); 
    const userEmail = useRecoilValue(userEmailState)
    const [isLoading, setIsLoading] = useState(true); 

    const init = async () => {
    const response = userEmail ? await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/purchasedCourses/${userEmail}`) : null; 
        setCourses(response?.data.courses)
        setEmail(response?.data.email); 
        console.log(response?.data.courses);
        if(response?.data.course) { 
            setIsLoading(false);
        }
        if(response?.data.email){
            setUser({ 
                userEmail: userEmail, 
                isLoading: false, 
            })
            if(response.data.course) { 
                setIsLoading(false);
            }
        } else{ 
            setUser({ 
                isLoading: false, 
                userEmail: null, 
            })
        }
    }

    useEffect(() => {
        init();
    }, []);

    if(isLoading) { 
        <div>
            Loading... 
        </div>
    }

    if(courses.length != 0){
        return (
            <>
            <Appbar />
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: '20px'}}> 
                {courses.map(course => {
                    return <Course key={course.id} course={course} />} 
                )}
            </div> 
            </>
        ); 
    } else { 
        return ( 
            <>
            {/* <Appbar />  */}
            <div className="mt-32">
                <h1 style={{ fontSize: "50px", fontWeight: 600, display: "flex", justifyContent: "center" }}>
                    You haven&apos;t purchased any <span className='text-indigo-500'>&nbsp;course&#58;&#40;</span> 
                </h1>
                <h3 style={{ fontSize: "50px", fontWeight: 600, display: "flex", justifyContent: "center" }}>
                    Go to the <span className='text-indigo-500'>&nbsp;courses&nbsp;</span> section and <span className='text-indigo-500'>&nbsp;buy&nbsp;</span> em!!!
                </h3>
            </div> 
            </>
        )
    }


}

//@ts-ignore
export function Course({course}) {
    const router = useRouter();

    return (  
        <div className="z-10" style={{display: "flex", justifyContent: "center", marginTop: 20}}>
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-7">
        <div
            className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
            <img
            src={course.imgLink} 
            alt="card-image" />
        </div>
        <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {course.title}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">  
            {course.description}
            </p>
        </div>
        <div className="p-6 pt-0">
            <button
            onClick={() => {
                router.push("/courses/" + course.id);
            }}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button">
            View Course
            </button>
        </div>
        </div>
        </div>
    )

}


export default PurchasedCourses;