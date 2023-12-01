'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaArrowDown } from "react-icons/fa";
import Cookies from 'js-cookie';

import {useSelector, useDispatch} from 'react-redux'

import { openChat } from '@/redux/features/chat';

const Persons = () => {

    const currentUsername = Cookies.get('username')
    const token = Cookies.get('token')
    const [persons, setPersons] = useState()

    useEffect(() => {
        const api = async() => {
            const response = await fetch(`http://localhost:5000/api/v1/chat/persons/${currentUsername}`, {
                method : 'GET',
                headers : { 
                    Authorization : `Bearer ${token}`
                }
            })
            const returnApi = await response.json()
            if(returnApi.success === true) setPersons(returnApi.data)

        }
        api()
    },[currentUsername, token])
   
   
    const dispatch = useDispatch()
    const foundUserName =  (username) => {
        dispatch(openChat(username))
      }

    return (
        <>

            <div className='scrollable-container '>
                {
                    persons && persons.map(data => {
                        return(
                            <button onClick={() => foundUserName(data.username)}  className='mt-4 border w-[98%] border-slate-700 hover:bg-slate-900 bg-slate-800 rounded-lg h-16 p-2 mr-2 flex flex-row items-center gap-8 '>
                            <Image src={'http://localhost:5000/uploads/' + data.avatar}   width={50} height={50} alt='user' className='rounded-full'></Image>
                            <h1 className=' font-roboto text-white'>{data.username}</h1>
                            <div className='flex flex-grow items-end justify-end'>
                                <FaArrowDown className=' font-light text-gray-400' />
                            </div>
                       </button>

                        )
                       
                    })
                }
     
            </div>

        </>
    )
}

export default Persons