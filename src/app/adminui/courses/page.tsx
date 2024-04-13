"use client"
import { Button, Card, Typography } from "@mui/material";
import { ObjectHTMLAttributes, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { userState } from "@/store/atoms/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "@/store/atoms/course";
import { courseInterfaceUi } from "@/store/atoms/course";
import { userEmailState } from "@/store/selectors/userEmail";
import { adminEmailState } from "@/store/selectors/adminEmail";
import { adminState } from "@/store/atoms/admin";


function PurchasedCourses() {
    const [courses, setCourses] = useState<courseInterfaceUi[]>([]);
    const [email, setEmail] = useState(null); 
    const setAdmin = useSetRecoilState(adminState); 
    const router = useRouter(); 
    const setTheCourse = useSetRecoilState(courseState); 
    const adminEmail = useRecoilValue(adminEmailState);
    // const typeofthis<> : courseInterfaceUi = {}

    type typeofthis = courseInterfaceUi; 

    // const init = async () => {
    //     const response = await axios.get(`http://localhost:3000/admin/courses`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //     setCourses(response.data.courses)
    //     setEmail(response.data.email);
    //     setTheCourse({course: null, isLoading: true});
    //     console.log(response.data.courses);
    //     if(response.data.email){
    //         setUser({ 
    //             userEmail: response.data.email, 
    //             userId: response.data.userId, 
    //             isLoading: false 
    //         });  
    //     } else{ 
    //         setUser({ 
    //             isLoading: false, 
    //             userEmail: null, 
    //             userId: null 
    //         })
    //     }
    // }

    useEffect(() => {

        const init = async () => {
            const response = adminEmail ? await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/courses/${adminEmail}`) : null; 
            setCourses(response?.data.courses)
            setEmail(response?.data.email);
            setTheCourse({course: null, isLoading: true});
            console.log(response?.data.courses);
            if(response?.data.email){
                setAdmin({ 
                    adminEmail: response.data.email,  
                    isLoading: false, 
                });  
            } else{ 
                setAdmin({ 
                    isLoading: false, 
                    adminEmail: null, 
                })
            }
        }

        init();
    }, [setAdmin, setCourses, setEmail, setTheCourse]);

    if(courses.length != 0){
        return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
        </div>

        

    } else { 
        return ( 
            <div className="mt-32" style={{justifyContent: "center" }}>
                <h1 style={{  fontWeight: 600, display: "flex", justifyContent: "center" }} className="sm:text-2xl md:text-4xl lg:text-5xl xl:text-7xl">
                    You haven&apos;t published any <span className='text-indigo-500'>&nbsp;course&#58;&#40;</span>
                </h1>
                <h3 style={{ fontWeight: 600, display: "flex", justifyContent: "center" }} className="sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl mt-7">
                    Go to the <span className='text-indigo-500'>&nbsp;create course&nbsp;</span> section and create em!!!
                </h3>
            </div>
        )
    }


}

function Course({course}: any) {   
    const router = useRouter();
    return ( 

        <div className="z-10">

        <div style={{display: "flex", justifyContent: "center", marginTop: 20}} >
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
                router.push("/adminui/courses/" + course.id);
            }}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button">
            View Course
            </button>
        </div>
        </div>
        </div>
        </div> 

    )

}

{/* <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                router.push("http://localhost:3000/courses/" + course.id);
            }}>Buy</Button>
        </div>
    </Card> */}
    {/* <img src={course.imageLink} style={{width: 300}} ></img> */}

export default PurchasedCourses;