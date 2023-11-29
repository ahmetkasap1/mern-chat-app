'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';



const Index = () => {
  const router= useRouter()
  const toastMessage = (message) => toast(message); //* toast message structure

  //* Showing the login and register cards on the screen sequentially.
  const [control, setControl] = useState(true)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const register = async () => {
    const api = await fetch('http://localhost:5000/api/v1/users/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    const response = await api.json() 

    if (response.success === true) {
      toastMessage(response.message)       //*message

      setUsername('') //* state clear
      setEmail('')
      setPassword('')

      setTimeout(() => {
        setControl(true) //* from register card to login card
      }, 2000);


    }
    else toastMessage(response.message)
    
  }



  const login = async () => {
    const api = await fetch('http://localhost:5000/api/v1/users/login', {
      method : "POST",
      headers : {'content-type' : 'application/json'},
      body : JSON.stringify({email,password})
    })
    const response = await api.json()

    if(response.success === true) {


      Cookies.set('token', response.data.token)
      Cookies.set('username',response.data.user.username )

      router.push(`/chat/${response.data.user.username}`)

    }
    else toastMessage(response.message)

  } 



  

  return (
    <>
      <div className='flex flex-row justify-center items-center gap-32 mb-8 mt-24 w-3/4 mx-auto'>

        {
          control === true ? (
            <div className='basis-1/3 '>
              <div className=' w-full h-auto bg-white  flex flex-col border-2  rounded-2xl  p-8  shadow-lg shadow-gray-500'>
                <h1 className='mt-4 mb-8 text-gray-800 text-2xl font-roboto  '>Log In</h1>

                <label htmlFor='login-email' className='font-roboto text-gray-600 mb-2 text-lg' >Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id='login-email' type='text' className='h-12 rounded-lg border-2 active:border-gray-400 outline-none font-roboto mb-4' />

                <label htmlFor='login-password' className='font-roboto text-gray-600 mb-2 text-lg ' >Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id='login-password' type='password' className='h-12 rounded-lg border-2 active:border-gray-400 outline-none font-roboto' />
                <button onClick={() => login()} className='mt-8 p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-roboto  w-24 rounded-xl hover:from-pink-500 hover:to-yellow-500  '>Log In</button>
                <button className='mt-8  font-roboto text-sm hover:text-gray-700 text-blue-500  ' onClick={() => setControl(false)}>Sign Up</button>

              </div>
            </div>

          ) : (
            <div className='basis-1/2' >
              <div className=' w-full h-auto bg-white  flex flex-col border-2  rounded-2xl  p-8  shadow-lg shadow-gray-500'>
                <h1 className='mt-4 mb-8 text-gray-800 text-2xl font-roboto  '>Sign Up</h1>

                <label htmlFor='username' className='font-roboto text-gray-600 mb-2 text-lg' >Username</label>
                <input required value={username} onChange={(e) => setUsername(e.target.value)} id='username' type='text' className='h-12 rounded-lg border-2 active:border-gray-400 outline-none font-roboto mb-4' />

                <label htmlFor='email' className='font-roboto text-gray-600 mb-2 text-lg' >Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' className='h-12 rounded-lg border-2 active:border-gray-400 outline-none font-roboto mb-4' />

                <label htmlFor='password' className='font-roboto text-gray-600 mb-2 text-lg ' >Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' className='h-12 rounded-lg border-2 active:border-gray-400 outline-none font-roboto mb-4' />
                <button onClick={() => register()} className='mt-8 p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-roboto  w-24 rounded-xl hover:from-pink-500 hover:to-yellow-500  '>Sign Up</button>
                <button className='mt-8  font-roboto text-sm hover:text-gray-700 text-blue-500  ' onClick={() => setControl(true)}>Log In</button>
                <ToastContainer></ToastContainer>

              </div>
            </div>
          )
        }

        <div className='basis-1/2 flex flex-col gap-16'>
          <h1 className='text-7xl  text-center  text-white'> Her zaman, her yerde birlikte takılın  </h1>
          <h1 className='text-2xl  text-center  text-gray-400'> React, en sevdiğiniz kişilerle bağlantıda kalmanızı kolay ve eğlenceli hale getirir.  </h1>
        </div>

      </div>

    </>
  )
}

export default Index

