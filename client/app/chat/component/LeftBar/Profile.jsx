'use client'

import Cookies from 'js-cookie'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const Profile = async () => {
  const token = Cookies.get('token')

  const [avatar,setAvatar] = useState()
  const [control,setControl] = useState(false)


  useEffect(() => {
    const getAvatar = async () => {
      const api = await fetch('http://localhost:5000/api/v1/users/avatar', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const response = await api.json()
      setAvatar(response.data.avatar)
    }
    getAvatar()

  },[])

  const [updateAvatar, setUpdateAvatar] = useState()

  const formData = new FormData()
  formData.append('avatar', updateAvatar)

    const editAvatar = async() => {
      const api = await fetch('http://localhost:5000/api/v1/users/avatar', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body : formData
        
      })
      const response = await api.json()
      
      setControl(false)

    }
    

  return (
    <>
      <button onClick={() => setControl(true)}>
        <Image src={"http://localhost:5000/uploads/"+avatar} width={50} height={50} className='rounded-full ' alt='avatar'/>
      </button>


      {control === true && (
        <div id='toogle' className=' flex flex-row items-center justify-start  '>
          <div className='bg-slate-700 left-[5.0%] h-[92vh] w-[29.3%] rounded-xl flex flex-col absolute top-[6.1%]'>
            <button
              className='text-sm text-white font-roboto bg-black hover:bg-gray-900 p-2 rounded-xl w-16 ml-auto mt-2 mr-2'
              onClick={() => setControl(false)}
            >
              X
            </button>

            <div className='flex flex-col items-center justify-center'>
              <div className='flex flex-row items-center gap-4'>
                <input onChange={(e) => setUpdateAvatar(e.target.files[0])} type='file' className='border-2 rounded-lg mt-8 mb-8 h-12 text-white' />
                <span className='text-white text-lg font-roboto'>Fotoğraf Düzenle</span>
              </div>
              <button onClick={() => editAvatar()} className='w-24 p-3 border-2 rounded-lg text-white hover:bg-gray-600'>
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile

