'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaArrowDown } from "react-icons/fa";

import { openChat } from '@/redux/features/chat';
import {useSelector, useDispatch} from 'react-redux'


const Search = () => {
  const [search, setSearch] = useState()
  const [found, setFound] = useState()

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/users/${search}`, {
        method: 'GET',
        header: { 'Content-Type': 'application/json' },

      })
      const returnResponse = await response.json()
      setFound(returnResponse)
     
    }
    api()
  }, [search])


  //* bulunan kullanıcıya göre sohbet ekranının açılması için controller değişkenin redux ile doldurulması.

  const dispatch = useDispatch()
  const controller = useSelector((state) => state.chat.controller)

  const foundUserName =  (username) => {
    dispatch(openChat(username))
  }






  //focus:absolute focus:w-[22.3%] focus:left-[13.4%] focus:top-[15.3%]
  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)}
        className='w-full h-12 mt-4 border-2 rounded-lg bg-slate-900 border-slate-800 outline-none font-roboto
          text-white text-sm p-2  '
        placeholder='yeni sohbet başlatın...' />

      {
        search ? (
          <div className='absolute top-[232px] left-[13.4%] h-[780px] w-[22.3%] border-2 bg-slate-900 outline-none border-slate-700 rounded-lg '>
            <h1 className='m-3 font-roboto text-lg text-gray-300'>Yakınındakiler</h1>

            <div className='scrollable-container m-2 ml-[15px]'>
              {
                found && found.data && found.data.map(res => {

                  return(
                    <button onClick={() => foundUserName(res.username)} className='mt-4 border  w-[98%] border-slate-700 hover:bg-slate-800 rounded-lg h-16 p-2 mr-2 flex flex-row items-center gap-8 '>
                      <Image width={50} height={50} src={"http://localhost:5000/uploads/"+res.avatar} alt='user' className=''></Image>
                      <h1 className=' font-roboto text-white'>
                        {
                          res.username
                        }
                      </h1>
                      <div className='flex flex-grow items-end justify-end'>
                          <FaArrowDown className=' font-light text-gray-400' />
                      </div>
                    </button>
                  )


                })
              }
               
                
                
            </div>
            
          </div>
        ) :(null)
      }
       




    </>
  )
}

export default Search