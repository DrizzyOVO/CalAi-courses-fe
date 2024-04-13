"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { courseState } from '@/store/atoms/course';
import {useRecoilState, useRecoilValue, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseDetails, courseDescription, courseImage } from '@/store/selectors/course';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import { adminEmailState } from '@/store/selectors/adminEmail';
import toast from 'react-hot-toast';
// import { useRouter } from 'next/router';

function Course({ params } : {params : any}) {
    let courseId  = params.courseId;
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);
    const courseReady = useRecoilValue(courseDetails); 
    const router = useRouter(); 
    const adminEmail = useRecoilValue(adminEmailState); 

    // useEffect(() => {

    //     console.log(courseId);
    //     async function smth(){
    //     await axios.get(`http://localhost:5000/admin/courses/${courseId}`, {
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     }).then(res => {
    //         setCourse({isLoading: false, course: res.data.course});
    //     })
    //     .catch(e => {
    //         setCourse({isLoading: false, course: null});
    //     });
    //   }
    //   smth(); 
    // }, []);


    useEffect(() => {
        
        setTimeout(() => {
        async function smth() {
            console.log(courseId);  
            const response = adminEmail?  await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/courses/${courseId}/getone`) : null; 

            if(response){ 
                setCourse({isLoading: false, course: response.data.course});
            } else {
                setCourse({isLoading: false, course: null});
            }
        }
        smth(); 
        }, 2000); 

    }, [courseId, setCourse]); 


    if (courseLoading) {
        return <>Loading...</>
    }

    // return (
    //   <>Yesssssssssssss</>
    // )

    return <div>
        <GrayTopper />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard courseId={courseId} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{height: 250, top: 0, width: "100vw", zIndex: 0, marginBottom: -250}} className='bg-gradient-to-tr from-indigo-700 to-indigo-500'>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard({courseId} : {courseId: string}) {
    const router = useRouter(); 
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const adminEmail = useRecoilValue(adminEmailState); 
    console.log(courseDetails);

    const [title, setTitle] = useState(courseDetails?.course?.title);
    const [description, setDescription] = useState(courseDetails?.course?.description);
    const [image, setImage] = useState(courseDetails?.course?.imgLink);
    const [price, setPrice] = useState(courseDetails?.course?.price);


    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card style={{maxWidth: 600, marginTop: 200, borderRadius: "20px"}} >
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: "20px", fontWeight: "bold"}} className='text-indigo-700'>Update course details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />

            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => { 
                  {Number.isNaN(price) ? setPrice(0) : setPrice(parseInt((e.target.value)))}
                  //@ts-ignore
                    // setPrice((e.target.value))
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />

            <button 
            // bg-gradient-to-tr
                className="block w-64 select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-3 px-6 text-center align-middle font-sans text-lg font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={async () => {
                    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/courses/` + courseDetails?.course?.id, {
                        title: title,
                        description: description,
                        imgLink: String(image),
                        published: true,
                        price: price, 
                        email: adminEmail 
                    }, {
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                    let updatedCourse = {
                        id: courseDetails?.course?.id,
                        title: title,
                        description: description,
                        imgLink: image,
                        price: price, 
                        published: true 
                    };

                    if (response.data.message == "Course updated"){
                      //@ts-ignore
                      setCourse({course: null, isLoading: true});
                      router.push(`/adminui/courses/${courseId}/updated`)
                    } else { 
                        toast.error("Couldn't update the course :( /n pls try again later")
                    }
                }}
            >Update course</button>
        </div>
    </Card>
</div>
}

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const imgLink = useRecoilValue(courseImage);

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={imgLink} style={{width: 350}} ></img>
        
        <div style={{marginLeft: 10, marginTop: "5px"}}>
            <Typography variant="h5">{title}</Typography>
            <Price />
        </div>
    </Card>
    </div>
}

function Price() {

    const price = useRecoilValue(coursePrice);
    return <div className='flex items-center mt-2'>
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price:
        </Typography>
        <Typography variant="subtitle1">
            <b>&nbsp;$ {price.toString()} </b>
        </Typography>
    </div>
}

export default Course;






  // useEffect(() => {
  //   async function smth() {

  //       const response = await axios.get(`http://localhost:5000/admin/courses/${courseId}`, { 
  //           headers: {
  //               "Authorization": "Bearer " + localStorage.getItem("token")
  //           }
  //       }); 

  //       if(response.data.message == "course found") { 
  //         setUserid(response.data.adminId); 
  //         setCourse(response.data.course); 
  //         setUser(response.data.theUser); 
  //       }

  //   }
  //   smth(); 

  // }, []);

