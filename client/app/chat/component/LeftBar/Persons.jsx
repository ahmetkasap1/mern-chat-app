import React from 'react'
import Image from 'next/image'
import { FaArrowDown } from "react-icons/fa";


const Persons = () => {

   

    return (
        <>

            <div className='scrollable-container '>
                <button  className='mt-4 border w-[98%] border-slate-700 hover:bg-slate-800 rounded-lg h-16 p-2 mr-2 flex flex-row items-center gap-8 '>
                    <Image width={50} height={50} src="/user.png" alt='user' className=''></Image>
                    <h1 className=' font-roboto text-white'>Ahmet Kasap</h1>
                    <div className='flex flex-grow items-end justify-end'>
                        <FaArrowDown className=' font-light text-gray-400' />
                    </div>
                </button>
              
               
                
            </div>




        </>
    )
}

export default Persons