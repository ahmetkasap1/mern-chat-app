import Button from '@/components/Button';
import Image from 'next/image'
import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import {useSelector, useDispatch} from 'react-redux'

const MainContent = () => {

    const controller = useSelector((state) => state.chat.controller)
    console.log("controller",controller)


    return (
        <>
        {
            controller && controller.data ?(
                <div className=' bg-slate-900 w-full h-[90vh] rounded-lg p-5 flex flex-col'>
                    <div className='flex flex-row items-center gap-6 mb-4'>
                        <Image src={"http://localhost:5000/uploads/"+controller.data[0].avatar} width={50} height={50} alt='user'></Image>
                        <h1 className='text-white font-roboto'>{controller.data[0].username }</h1>
                        <div className='flex flex-grow items-end justify-end'>
                            <HiOutlineDotsVertical className='w-8 h-6 text-white' />
                        </div>
                    </div>
                    <hr />

                    <div className='mt-16 scrollable-container p-2'>
                        <div className="h-auto w-96 ml-auto mt-2 rounded-2xl bg-green-500 flex flex-row items-end justify-between">
                            <p className="p-3 font-sans text-white text-lg w-full">Lorem</p>
                            <span className="mr-2 text-white text-sm">22.39</span>
                        </div>
                    </div>

                    <div className='mt-auto flex flex-row gap-4'>
                        <textarea className='w-full h-14 resize-none bg-slate-800 text-white border-2 rounded-lg border-slate-600 outline-none font-roboto p-3 '  placeholder='yeni sohbet başlatın...' /> 
                        <button className='p-1 w-24  border text-white rounded-xl  font-roboto border-slate-600  hover:bg-slate-800'>Gönder</button>
                    </div>
                </div>
                
            ) : (
                <div className='bg-slate-900 w-full h-[90vh] rounded-lg p-5 flex flex-col items-center justify-center gap-8'>
                    <h1 className='text-5xl font-roboto text-slate-100'>Mobil Uygulamamızı İndirin</h1>
                    <p className='font-roboto text-white text-lg'>Yeni mobil uygulamamızı indirerek, daha hızlı ve etkili bir biçimde sohbetin keyfini çıkarın.</p>
                    <Image src="/chat.png" width={700} height={700}></Image>
                    <Button  buttonName="İndir"></Button>
                </div>
            )
        }

       


            
        </>
    )
}

export default MainContent;


/*




        <div className=' bg-slate-900 w-full h-[90vh] rounded-lg p-5 flex flex-col'>
                <div className='flex flex-row items-center gap-6 mb-4'>
                    <Image src="/user.png" width={50} height={50} alt='user'></Image>
                    <h1 className='text-white font-roboto'>User Name</h1>
                    <div className='flex flex-grow items-end justify-end'>
                        <HiOutlineDotsVertical className='w-8 h-6 text-white' />
                    </div>
                </div>
                <hr />

                <div className='mt-16 scrollable-container p-2'>
                    <div className="h-auto w-96 ml-auto mt-2 rounded-2xl bg-green-500 flex flex-row items-end justify-between">
                        <p className="p-3 font-sans text-white text-lg w-full">Lorem</p>
                        <span className="mr-2 text-white text-sm">22.39</span>
                    </div>
                </div>

                <div className='mt-auto flex flex-row gap-4'>
                    <textarea className='w-full h-14 resize-none bg-slate-800 text-white border-2 rounded-lg border-slate-600 outline-none font-roboto p-3 '  placeholder='yeni sohbet başlatın...' /> 
                    <button className='p-1 w-24  border text-white rounded-xl  font-roboto border-slate-600  hover:bg-slate-800'>Gönder</button>
                </div>
            </div>*/