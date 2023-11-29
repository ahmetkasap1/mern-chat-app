'use client'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import LeftBarAll from '../component/LeftBar/LeftBarAll'
import MainContent from '../component/MainContent'

const page = async ({ params }) => {
  const router = useRouter() 

  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const paramsUsername = params.username
  const token = Cookies.get('token')
  const username = Cookies.get('username')

  useEffect(() => {
    if(!token || !username) { //* token veya username'den biri yoksa login sayfasına at.
      router.push('/')
    }
    else if (paramsUsername === username && token) {
      setIsAuth(true)
      setLoading(false)
    }
    else {
      setLoading(false)
      setError(true)
    }

  }, [])


  return (
    <>
      {
        loading ? (
          <div className=' bg-gray-900 h-[100vh] w-full flex flex-row items-center justify-center '>
            <Image width={200} height={200} src='/logo.png' alt="logo" className=''/>
          </div>
        ): error ? (
          <div className='bg-gray-900 h-[100vh] w-full flex flex-row items-start justify-center'>
            <h1 className='text-gray-200 text-5xl'>Böyle bir sayfa mevcut değil</h1>
          </div>
        ) : isAuth ? (
            <div className='w-[90%] mx-auto flex flex-row mt-16 gap-8'>
              <div className='w-1/2'>
                <LeftBarAll></LeftBarAll>
              </div>
              <MainContent></MainContent>
            </div>
        ) : null
      }


    </>
  )
}

export default page


