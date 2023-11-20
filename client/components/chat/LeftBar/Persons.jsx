import React from 'react'
import Image from 'next/image'
import { FaArrowDown } from "react-icons/fa";


const Persons = () => {
    return (
        <>

            <div className='scrollable-container '>
                <div className='mt-4 border-2 hover:bg-slate-100 rounded-lg h-16 p-2 mr-2 flex flex-row items-center gap-8 '>
                    <Image width={50} height={50} src="/user.png" className=''></Image>
                    <h1 className=' font-roboto'>Ahmet Kasap</h1>
                    <div className='flex flex-grow items-end justify-end'>
                        <FaArrowDown className=' font-light text-gray-600' />
                    </div>
                </div>
                
            </div>




        </>
    )
}

export default Persons