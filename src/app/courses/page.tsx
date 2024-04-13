"use client"
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { userState } from "@/store/atoms/user"; 
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "@/store/atoms/course";
import Appbar from "@/components/client/Appbar";
import { userEmailState } from "@/store/selectors/userEmail";

interface Course {
    id: Number, 
    adminId: Number, 
    allCourseId: Number, 
    title: string, 
    description: string,  
    price: Number, 
    published: Boolean 
}

function Courses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [email, setEmail] = useState(null); 
    const setUser = useSetRecoilState(userState); 
    const setTheCourse = useSetRecoilState(courseState); 
    const userEmail = useRecoilValue(userEmailState)

    const init = async () => {
        const response = userEmail ? await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/courses/${userEmail}`) : null; 
        setCourses(response?.data.courses)
        setEmail(response?.data.email); 
        setTheCourse({course: null, isLoading: true});
        console.log(response?.data.courses);
        console.log('course : ' + response?.data.courses[0].imgLink);
        if(response){
            setUser({ 
                userEmail: userEmail, 
                isLoading: false, 
            })
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

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course key={course.id} course={course} />} 
        )}
    </div>
}

//@ts-ignore
export function Course({course}) {
    const router = useRouter();

    return ( 
        // <Card style={{
        //     margin: 10,
        //     width: 300,
        //     minHeight: 200,
        //     padding: 20
        // }}>
        //     <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        //     <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        //     <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
        //         <Button variant="contained" size="large" onClick={() => {
        //             router.push("http://localhost:3000/courses/" + course.id);
        //         }}>View Course</Button>
        //     </div>
        // </Card>

        <>
        {/* <Appbar /> */}
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
                router.push("/courses/" + course.id);
            }}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button">
            View Course
            </button>
        </div>
        </div>
        </div>
        </div>
        </> 
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

export default Courses;