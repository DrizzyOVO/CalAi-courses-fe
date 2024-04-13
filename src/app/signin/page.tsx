import React from 'react'
import Signin from '@/components/client/Signin'
import Appbar from '@/components/client/Appbar';

const Page = () => {   
  return (
    <>
    {/* <Appbar />  */}
    <div className='z-10'>
        <Signin />
    </div>  
    </>
  )
}

export default Page;  