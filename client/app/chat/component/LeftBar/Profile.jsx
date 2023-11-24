import Image from 'next/image'
import React from 'react'


const Profile = () => {
  return (
    <>
      <Image src="/logo.png" width={50} height={50} className='rounded-full ' alt='avatar'></Image>
    </>
  )
}

export default Profile