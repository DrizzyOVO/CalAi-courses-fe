// Signup 

// return <div>
//             <div style={{
//                 paddingTop: 150,
//                 marginBottom: 10,
//                 display: "flex",
//                 justifyContent: "center"
//             }}>
//                 <Typography variant={"h6"}>
//                 Welcome to Coursera. Sign up below
//                 </Typography>
//             </div>
//         <div style={{display: "flex", justifyContent: "center"}}>
//             <Card style={{width: 400, padding: 20}}>
//                 <TextField
//                     onChange={(evant11) => {
//                         let elemt = evant11.target;
//                         setEmail(elemt.value);
//                     }}
//                     fullWidth={true}
//                     label="Email"
//                     variant="outlined"
//                 />
//                 <br/><br/>
//                 <TextField
//                     onChange={(e) => {
//                         setPassword(e.target.value);
//                     }}
//                     fullWidth={true}
//                     label="Password"
//                     variant="outlined"
//                     type={"password"}
//                 />
//                 <br/><br/>

//                 <Button
//                     size={"large"}
//                     variant="contained"
//                     onClick={async() => {
//                         const response = await axios.post("http://localhost:5000/user/signup", {
//                             email: email,
//                             password: password
//                         })
                        
//                         if (response) { 

//                             if(response.data.error){
//                                 window.alert("Invalid input :( \nemail length should be between 5-30 \npassword length should be between 7-30");  
//                             }

//                             else if (response.data.message == 'User already exists' || 'Created user sucessfully'){  
//                                 let data = response.data;
//                                 localStorage.setItem("token", data.token);
//                                 setUser({ 
//                                     isLoading: false, 
//                                     userEmail: data.email, 
//                                     userId: data.userId 
//                                 }); 
//                                 router.push("http://localhost:3000");
//                             } else {
//                                 window.alert("Try again.")
//                                 setUser({ 
//                                     isLoading: false, 
//                                     userEmail: null,  
//                                     userId: null  
//                                 }); 
//                                 router.push("http://localhost:3000/singup");
//                             } 

//                         } else { 
//                             window.alert("Try again"); 
//                             router.push("http://localhost:3000/singup");
//                         }
//                     }}

//                 >Signup</Button>
//             </Card>
//         </div>
//     </div>



// Singin functionality 

// onClick={async () => {
//     const res = await axios.post("http://localhost:5000/user/login", {
//         email: email,
//         password: password
//     }, {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }); 
//     const data = res.data;
//     if(data) { 

//         if (data.message === 'Invalid username or password'){

//             window.alert('Invalid username or password');  
//             setUser({ 
//                 userEmail: null,   
//                 isLoading: false, 
//                 userId: null 
//             })

//         } else { 

//             localStorage.setItem("token", data.token);
//             setUser({ 
//                 userEmail: data.email,  
//                 isLoading: false, 
//                 userId: data.userId 
//             })
//             router.push("http://localhost:3000/courses");  

//         }
//     } else { 
//         setUser({ 
//             userEmail: null,   
//             isLoading: false, 
//             userId: null 
//         })
//     }
// }}

