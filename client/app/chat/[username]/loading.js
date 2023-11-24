import React from 'react'
import Image from 'next/image'

const loading = () => {
  return (
    <div className=' bg-gray-900 h-[100vh] w-full flex flex-row items-center justify-center '>
            <Image width={200} height={200} src='/logo.png' className=''/>
    </div>
  )
}

export default loading