"use client"; 
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Card, responsiveFontSizes} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userEmailState } from "@/store/selectors/userEmail";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";
import { adminEmailState } from "@/store/selectors/adminEmail";


function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0); 
    const [imgLink, setImgLink] = useState(""); 
    const router = useRouter(); 
    const adminEmail = useRecoilValue(adminEmailState); 

    // return <div style={{display: "flex", justifyContent: "center", minHeight: "80vh", flexDirection: "column"}}>
    //     <div style={{display: "flex", justifyContent: "center"}}>
    //         <Card style={{width: 400, padding: 20, marginTop: 30, height: "100%", borderRadius: "30px"}}>
    //             <TextField
    //                 style={{marginBottom: 10}}
    //                 onChange={(e) => {
    //                     setTitle(e.target.value)
    //                 }}
    //                 fullWidth={true}
    //                 label="Title"
    //                 variant="outlined"
    //             />

    //             <TextField
    //                 style={{marginBottom: 10}}
    //                 onChange={(e) => {
    //                     setDescription(e.target.value)
    //                 }}
    //                 fullWidth={true}
    //                 label="Description"
    //                 variant="outlined"
    //             />

    //             <TextField
    //                 style={{marginBottom: 10}}
    //                 onChange={(e) => {
    //                     {Number.isNaN(price) ? setPrice(0) : setPrice(parseInt((e.target.value)))}
    //                 }}
    //                 fullWidth={true}
    //                 label="Price"
    //                 variant="outlined"
    //             />

    //             <Button
    //                 size={"large"}
    //                 // variant="contained"
    //                 onClick={async () => {
    //                     const response = await axios.post(`http://localhost:5000/admin/createCourse`, {
    //                         title: title,
    //                         description: description,
    //                         published: true,
    //                         price: price 
    //                     }, {
    //                         headers: {
    //                             "Content-type": "application/json",
    //                             "Authorization": "Bearer " + localStorage.getItem("token")
    //                         }
    //                     });

    //                     if(response){ 
    //                         // window.alert("Added course!");
    //                         router.push("/addcourse/courseadded")
    //                     }

    //                 }}
    //             > Add course</Button>
    //         </Card>
    //     </div>
    // </div>


    return <div className='flex justify-center'>

    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border mt-20">
    <div
        className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-3xl bg-gradient-to-tr from-indigo-700 to-indigo-500 bg-clip-border shadow-gray-900/20">
        <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
        Create Course
        </h3>
    </div>
    <div className="flex flex-col gap-4 p-6">
        <div className="relative h-11 w-full min-w-[200px]">
        <input
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " />
        <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Title
        </label>
        </div>

        <div className="relative h-11 w-full min-w-[200px]">
        <input
            onChange={(e) => {
                setDescription(e.target.value)
            }}
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " />
        <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Description
        </label>
        </div>

        <div className="relative h-11 w-full min-w-[200px]">
        <input
            onChange={(e) => {
                setImgLink(e.target.value)
            }}
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " />
        <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Image Link
        </label>
        </div>

        <div className="relative h-11 w-full min-w-[200px]">
        <input
            onChange={(e) => {
                {Number.isNaN(price) ? setPrice(0) : setPrice(parseInt((e.target.value)))}
            }}
            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " />
        <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Price
        </label>
        </div>

        <div className="-ml-2.5">

        </div>
    </div>
    <div className="p-6 pt-0">
        <button
        onClick={async () => {
            const response = adminEmail ? await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/createCourse`, {
                title: title,
                description: description,
                published: true, 
                imgLink: String(imgLink), 
                price: price, 
                email: adminEmail
            }, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }) : null; 

            if(response){ 
                // window.alert("Added course!");
                if(response.data.message == 'Course added successfully') { 
                    router.push("/adminui/addcourse/courseadded")
                } else { 
                    // window.alert("Couldn't add course :( /n pls try again later!"); 
                    toast.error("Couldn't add course :( /n pls try again later!")
                }
            } else { 
                // window.alert("An unexpected error occured :( /n pls try again later!");
                toast.error("An unexpected error occured :( /n pls try again later!")
            }

        }}
        className="block w-full select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-3 px-6 text-center align-middle font-sans text-lg font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        Publish
        </button>

    </div>
    </div>

    </div>

}

export default AddCourse;




