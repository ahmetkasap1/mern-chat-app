import Cookies from 'js-cookie'
import React from 'react'
import { useRouter } from 'next/navigation'

const Logout = () => {
    const router = useRouter()

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('username')

        router.push('/')
    }

    
  return (
    <>
        <button onClick={() => logout()}  className='text-white p-2 border-2 rounded-full hover:bg-slate-800 font-roboto'>  Çıkış Yap </button>
    </>
  )
}

export default Logout