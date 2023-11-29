'use client'
import Button from '@/components/Button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const MainContent = () => {

  const controller = useSelector((state) => state.chat.controller)
  const [messages, setMessages] = useState([])
  const [receiverUsername, setReceiverUsername] = useState()
  const publisherUsername = Cookies.get('username')
  const [socket, setSocket] = useState()

  //* mesaj gönderilecek username'i aldık
  useEffect(() => {
    if (controller && controller.data && controller.data[0]) {
      setReceiverUsername(controller.data[0].username)
    }
  }, [controller])

  //* socket bağlantısını kurduk
  useEffect(() => {
    if (!socket) {
      const newSocket = io('http://localhost:3001')
      newSocket.on('connect', () => {
        setSocket(newSocket)
      })
    }
  }, [])

  //* sockete bağlanan kullanıcıları onlineusers adında backende bir diziye kaydetmek için gönderdik.
  useEffect(() => {
    if (socket && socket.id) socket.emit('onlineUsers', { receiverUsername: publisherUsername, socketId: socket.id })
  }, [socket, receiverUsername])

  const inputRef = useRef()

  //* mesagı gönderdik.
  const sendMessage = async () => {
    const message = await inputRef.current.value
    setMessages((prevMessages) => [...prevMessages, { sender: 'publish', message }])
    await socket.emit('message', { publisherUsername, receiverUsername, socketId: socket.id, message })
  }

  //*gelen mesajı yakaladık
  useEffect(() => {
    if (socket) {
      socket.on('recive-message', (data) => {
        setMessages((prevMessages) => [...prevMessages, { sender: 'recive', message: data.message }])
      });
    }
  }, [socket])


  

  return (
    <>
      {controller && controller.data ? (
        <div className='bg-gradient-to-r from-gray-900 to-gray-600  w-full h-[90vh] rounded-lg p-5 flex flex-col'>
          <div className='flex flex-row items-center gap-6 mb-4'>
            <Image src={'http://localhost:5000/uploads/' + controller.data[0].avatar} width={50} height={50} alt='user' />
            <h1 className='text-white font-roboto'>{controller.data[0].username}</h1>
            <div className='flex flex-grow items-end justify-end'>
              <HiOutlineDotsVertical className='w-8 h-6 text-white' />
            </div>
          </div>
          <hr />

          <div className='mt-16 scrollable-container p-2'>
            {messages.map((data, index) => (
             <div key={index} className="flex flex-row items-end gap-2 ">
             <p className={`
             h-auto p-3 text-white    ml-${data.sender === 'recive' ? 'auto' : '0'} mt-2 rounded-2xl ${
                data.sender === 'recive' ? 'mr-auto bg-red-500' : 'ml-auto bg-blue-500'
              } f`}>{data.message}
                <span className='mr-2 text-gray-300 text-[10px] m-2 '>22.39</span>
            </p>
             
           </div>
           
            ))}
          </div>

          <div className='mt-auto flex flex-row gap-4'>
            <textarea
              ref={inputRef}
              className='w-full h-14 resize-none bg-slate-800 text-white border-2 rounded-lg border-slate-600 outline-none font-roboto p-3 '
              placeholder='yeni sohbet başlatın...'
            />
            <button onClick={sendMessage} className='p-1 w-24 bg-gray-900 border text-white rounded-xl  font-roboto border-slate-600  hover:bg-slate-800'>
              Gönder
            </button>
          </div>
        </div>
      ) : (
        <div className='bg-slate-900 w-full h-[90vh] rounded-lg p-5 flex flex-col items-center justify-center gap-8'>
          <h1 className='text-5xl font-roboto text-slate-100'>Mobil Uygulamamızı İndirin</h1>
          <p className='font-roboto text-white text-lg'>
            Yeni mobil uygulamamızı indirerek, daha hızlı ve etkili bir biçimde sohbetin keyfini çıkarın.
          </p>
          <Image src='/chat.png' width={700} height={700} />
          <Button buttonName='İndir' />
        </div>
      )}
    </>
  );
};

export default MainContent;
