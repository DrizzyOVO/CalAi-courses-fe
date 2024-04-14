"use client"
import { useEffect, useState } from "react";
import React from 'react'
import { Card, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { courseState, courseInterface } from "@/store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseDescription } from "@/store/selectors/course";
import { redirect, useRouter } from "next/navigation";
import Image from 'next/image'
import Appbar from "@/components/client/Appbar";
import { userEmailState } from "@/store/selectors/userEmail";
import { checkout } from "../../checkout"


interface Course {
  id: String, 
  title: String, 
  description: String, 
  price: Number, 
  imgLink: string, 
  published: Boolean
}

function Course({ params } : {params : any}) {
    let courseId = params.courseId; 
    const router = useRouter(); 
    const [userid, setUserid] = useState(null); 
    const [user, setUser] = useState(null)
    const [bought, setBought] = useState(false); 
    const [course, setCourse] = useState<Course>(); 
    const courseLoading = useRecoilValue(isCourseLoading);
    const userEmail = useRecoilValue(userEmailState)

    useEffect(() => {
      async function smth() {

          console.log("courseId :- " + courseId);

          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/courses/${courseId}/${userEmail}`);
  
          if(response?.data.message == "course found") { 
            setUserid(response?.data.userId); 
            setCourse(response?.data.course); 
            setUser(response?.data.theUser); 
            console.log("course :- " + response?.data.course); 
            console.log(course);
            console.log("title :- " + course?.title); 
          }
  
      }
      smth(); 
  
    }, []);

    const out = async () => {

      let key = ""
      if (course?.title == "Ui/Ux") { 
        key = `${process.env.NEXT_PUBLIC_UI_UX}`
      } else if (course?.title == "LaFerrari") { 
        key = `${process.env.NEXT_PUBLIC_LAFERRARI}`
      } else { 
        key = `${process.env.NEXT_PUBLIC_WEBSITE_DEVELOPMENT}`
      }

      checkout({
        lineItems: [
          {
            price: key,
            quantity: 1
          }
        ]
      }) 

    }

    const buyCourse = async () => {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/courses/${courseId}/buy`, {
        email: userEmail
      }, {
        headers: {
            "Content-type": "application/json"
        }
    }); 

      // let key = ""
      // if (course?.title == "Ui/Ux") { 
      //   key = `${process.env.NEXT_PUBLIC_UI_UX}`
      // } else if (course?.title == "LaFerrari") { 
      //   key = `${process.env.NEXT_PUBLIC_LAFERRARI}`
      // } else { 
      //   key = `${process.env.NEXT_PUBLIC_WEBSITE_DEVELOPMENT}`
      // }
      // // buyCourse();
      // checkout({
      //   lineItems: [
      //     {
      //       price: key,
      //       quantity: 1
      //     }
      //   ]
      // }) 
  
      if(response?.data.message == "Bought it") {  
        setBought(true); 
        router.push(`/courses/${courseId}/purchased`); 
      }

      // await out(); 
  
      // router.push(`http://localhost:3000/courses/${courseId}/${userid}`); 
  
    }

    return (
      
      <>
      {/* <Appbar />  */}
      <div className="z-10">
        <GrayTopper course={course as Course} />
        <Grid container style={{ display: "flex", justifyContent: "center", marginLeft: "2%" }}>
            <div className=''>
              <Grid item lg={12} md={12} sm={12} mt={20}>
                <CourseCard course={course as Course} />
              </Grid>
            </div>

        </Grid>
        <div style={{ alignItems: "cener" }}>
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            page {params.courseId}
          </div> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {
              user ? 
              <h3>You purchased this course</h3> : 
              // <form action={buyCourse}>
                <button
                  className="align-middle select-none font-sans font-bold text-center text-xl mt-5 mb-5 uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" 
                  type="submit"
                  onClick={ () => {
                    let key = ""
                    if (course?.title == "Ui/Ux") { 
                      key = `${process.env.NEXT_PUBLIC_UI_UX}`
                    } else if (course?.title == "LaFerrari") { 
                      key = `${process.env.NEXT_PUBLIC_LAFERRARI}`
                    } else { 
                      key = `${process.env.NEXT_PUBLIC_WEBSITE_DEVELOPMENT}`
                    }
                    // buyCourse();
                    checkout({
                      lineItems: [
                        {
                          price: key,
                          quantity: 1
                        }
                      ]
                    }) 
                    buyCourse();

                    // const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret);
                    // if (error) {
                    //     console.log("error byuing");
                    // } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                    //     await buyCourse(); 
                    // }

                  // })}

                  // onClick={async () => {
                  //   const response = router.push(`https://buy.stripe.com/test_9AQg03byM0r8d2w144`)
                  //   console.log(response); 
                  }}

                >Buy</button> 
              // </form>
            } 
          </div>
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{userid ? "yesss" : "Nooooo"}</h1>
          </div> */}
        </div>
    </div>
    </>
  );
}

function GrayTopper({ course } : { course: Course }) {
  console.log("course title 2 :- " + course?.title); 

    return <div style={{height: 250, top: 0, width: "100vw", zIndex: 0, marginBottom: -250}} className='bg-gradient-to-tr from-indigo-700 to-indigo-500'>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <h1 style={{color: "white", fontWeight: 600, display: "flex", fontSize: "30px", marginLeft: 50, marginBottom: 70 }} >
                    {course?.title}
                </h1>
        </div>
    </div>
}



function CourseCard({ course } : { course: Course }) {
    const title = course?.title; 
    const description = course?.description; 
    const price = course?.price 
    const imgLink = course?.imgLink; 

    return <div style={{ marginTop: 50, width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        {/* <Image src={imgLink} alt="someImg" width={350} height={150} /> */}
        <img src={imgLink} alt="someImg" style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <h1>{title}</h1>
            <h1>{description}</h1>
            <Price price={price as Number} />
        </div>
    </Card>
    </div>
}

function Price({ price }: { price: Number }) {

    return <>
        <Typography variant="subtitle2" style={{color: "gray"}}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>$ {price?.toString()}</b>
        </Typography>
    </>
}

export default Course;



// onClick={() => buyCourse(String(course?.id))}