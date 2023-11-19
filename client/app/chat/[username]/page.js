import LeftBarAll from '@/components/chat/LeftBar/LeftBarAll'
import LeftBar from '@/components/chat/LeftBar/Profile'
import MainContent from '@/components/chat/MainContent'
import React from 'react'

const page = ({params}) => {
  return (
    <>
      <div className='w-3/4 mx-auto flex flex-row mt-16 gap-8' >
        <div className='w-1/2'>
          <LeftBarAll></LeftBarAll>
        </div>
        <MainContent></MainContent>
      </div>
      
    </>
  )
}

export default page