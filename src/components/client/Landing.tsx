import React from 'react'
import { useRouter } from 'next/navigation'

const Landing = () => { 

  const navigate = useRouter(); 

  return (
  <>

    <div className='grid grid-cols-1 sm:grid-cols-2 items-center bg-gray-100'> 

      <div>
        <h1 style={{  fontWeight: 600, display: "flex", justifyContent: "center" }} className="sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Get the best quality<span className='text-indigo-500'>&nbsp;Skills</span>&nbsp;from
        </h1>
        <h1 style={{  fontWeight: 600, display: "flex", justifyContent: "center" }} className="sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          <span className='text-indigo-500'>Top</span>&nbsp;Instructors!
        </h1>
      </div> 

      <div className='m-auto'>  
        <img src="/studentImg3.png" alt="smth" />
      </div>  

    </div>
    
    <div className='grid grid-cols-1 sm:grid-cols-2 bg-gray-200 py-36'>

      <div className='m-auto'>
          <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg" className="relative rounded-2xl" alt="food illustration" loading="lazy" width="500" height="600" />
      </div>

      <div className='m-auto mt-32 justify-center'>
                <h1 style={{  fontWeight: 600, display: "flex", justifyContent: "center" }} className="sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                    Become an <span className='text-indigo-500'>&nbsp;Instructor!</span>
                </h1>
                <h3 style={{ fontWeight: 500, display: "flex", justifyContent: "center" }} className="sm:text-sm md:text-base lg:text-xl xl:text-2xl mt-7">
                  Instructors from around the world teach millions of learners on Udemy. We provide the tools and skills to teach what you love.
                </h3>
                <h3 style={{ fontWeight: 600, display: "flex", justifyContent: "center" }} className="sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl mt-7">
                  <button
                            className="font-semibold w-auto select-none rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 py-2 px-4 text-center align-middle font-sans text-lg uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none "
                            onClick={() => {
                                navigate.push("/adminui") 
                            }}
                        >Start teaching today</button>
                </h3>
      </div>

    </div>

  </>

  )
}

export default Landing