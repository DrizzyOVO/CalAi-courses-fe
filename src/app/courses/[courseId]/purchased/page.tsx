import Appbar from '@/components/client/Appbar'
import React from 'react'

const page = () => {
  return (

    <>
    {/* <Appbar /> */}
    <div className='z-10'> 
        <h1 style={{ fontSize: "50px", fontWeight: 600, display: "flex", justifyContent: "center" }} className='text-indigo-500'>
          Congratulations!
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ fontSize: "40px", fontWeight: 400 }}>You bought the course<span className='text-indigo-500'>!!!</span></h1>
        </div>
    
    </div> 
    </>
  )
}

export default page