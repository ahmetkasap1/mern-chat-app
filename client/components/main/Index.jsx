'use client'
import React, { useState } from 'react'

const Index = () => {

  const [control, setControl] = useState(true)

  const change = (bool) => {
    if(bool === true) setControl(true)
    else setControl(false)
  }


  console.log(control)

  return (
    <>
      <div className='flex flex-row justify-center items-center gap-32 mb-8 mt-24 w-3/4 mx-auto'>
        
      {
        control === true ? (
          <div className='w-1/3 '>
          <div className=' w-full h-auto bg-white  flex flex-col border-2  rounded-2xl  p-8  shadow-lg shadow-gray-500'>
            <h1 className='mt-4 mb-8 text-gray-800 text-2xl font-roboto  '>Log In</h1>
  
            <label htmlFor='email' className='font-roboto text-gray-600 mb-2 text-lg' >Email</label>
            <input id='email' type='text' placeholder='email' className='w-full h-12 rounded-lg mb-6 border-2' />
  
            <label htmlFor='email' className='font-roboto text-gray-600 mb-2 text-lg ' >Password</label>
            <input id='email' type='text' placeholder='email' className='h-12 rounded-lg border-2 active:border-gray-400 outline-none' />
            <button className='mt-8 p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-roboto  w-24 rounded-xl hover:from-pink-500 hover:to-yellow-500  '>Log In</button>
            <button className='mt-8  font-roboto text-sm hover:text-gray-700 text-blue-500  ' onClick={() => change(false)}>Sign Up</button>
  
          </div>
        </div>

        ) : (
          <div className='w-1/3  card-animation'>
          <div className=' w-full h-auto bg-white  flex flex-col border-2  rounded-2xl  p-8  shadow-lg shadow-gray-500'>
            <h1 className='mt-4 mb-8 text-gray-800 text-2xl font-roboto  '>Sign Up</h1>

            <label htmlFor='username' className='font-roboto text-gray-600 mb-2 text-lg' >Username</label>
            <input id='username' type='text' placeholder='username' className='w-full h-12 rounded-lg mb-6 border-2' />

            <label htmlFor='email' className='font-roboto text-gray-600 mb-2 text-lg' >Email</label>
            <input id='email' type='email' placeholder='email' className='w-full h-12 rounded-lg mb-6 border-2' />
  
            <label htmlFor='password' className='font-roboto text-gray-600 mb-2 text-lg ' >Password</label>
            <input id='password' type='password' placeholder='password' className='h-12 rounded-lg border-2 active:border-gray-400 outline-none' />
            <button className='mt-8 p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-roboto  w-24 rounded-xl hover:from-pink-500 hover:to-yellow-500  '>Sign Up</button>
            <button className='mt-8  font-roboto text-sm hover:text-gray-700 text-blue-500  ' onClick={() => change(true)}>Log In</button>
  
          </div>
        </div>

        )
      }

      <div className='flex flex-col gap-16'>
      <h1 className='text-7xl  text-center  text-white'> Her zaman, her yerde birlikte takılın  </h1>
      <h1 className='text-2xl  text-center  text-gray-400'> React, en sevdiğiniz kişilerle bağlantıda kalmanızı kolay ve eğlenceli hale getirir.  </h1>
      </div>

    


       
      </div>

    


      

    </>
  )
}

export default Index