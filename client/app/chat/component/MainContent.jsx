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
  const token = Cookies.get('token')

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
    const date = new Date()
    const hours = date.getHours() + ":" + date.getMinutes()

    const message = await inputRef.current.value
    setMessages((prevMessages) => [...prevMessages, { sender: 'publish', message, hours }])
    await socket.emit('message', { publisherUsername, receiverUsername, socketId: socket.id, message, hours })
    inputRef.current.value=""

    //* database kayıt

    const messageStructure = {
      message : [
        {senderUsername : publisherUsername, messages : message}
      ],
      chatId : [publisherUsername, receiverUsername]
    }

    const api = await fetch('http://localhost:5000/api/v1/chat/message', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${token}`
      },
      
      body : JSON.stringify(messageStructure)
    })
    const response = await api.json()
    

  }

  //*gelen mesajı yakaladık
  useEffect(() => {
    if (socket) {
      socket.on('recive-message', (data) => {
        setMessages((prevMessages) => [...prevMessages, { sender: 'recive', message: data.message, hours: data.hours }])
      });
    }
  }, [socket])


  //*mesajlaşılacak kullanıcı değiştirildiğinde state boşalt.
  useEffect(() => {
    setMessages("")
    setOldMessages("")
  },[controller])


  //* veri tabanından gelen mesajlar

  const [oldMessages, setOldMessages] = useState([])

  useEffect(() => {
    const api = async() => {
      const response = await fetch(`http://localhost:5000/api/v1/chat/message/m?senderUsername=${publisherUsername}&reciverUsername=${receiverUsername}`, {
        method : 'GET',
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      const returnData = await response.json()

      if(returnData.success === true) {
        returnData.data.message.map(messages => {
          setOldMessages((prevMessages) => [...prevMessages, messages ])
        })
      }
      
    }
    api()

   

  },[receiverUsername])


  return (
    <>
      {controller && controller.data ? (
        <div className='bg-gradient-to-r from-gray-900 to-gray-600  w-full h-[90vh] rounded-lg p-5 flex flex-col'>
          <div className='flex flex-row items-center gap-6 mb-4'>
            <Image className='rounded-full' src={'http://localhost:5000/uploads/' + controller.data[0].avatar} width={50} height={50} alt='user' />
            <h1 className='text-white font-roboto'>{controller.data[0].username}</h1>
            <div className='flex flex-grow items-end justify-end'>
              <HiOutlineDotsVertical className='w-8 h-6 text-white' />
            </div>
          </div>
          <hr />

          <div className='mt-16 scrollable-container p-2'>
            {oldMessages && oldMessages.map((message, index) => {
              return(
                <div key={index} className={`flex flex-row items-end gap-2 ${message.senderUsername === publisherUsername ? 'justify-end' : 'justify-start'}`}>
                <p className={`h-auto p-3 text-white ml-${message.senderUsername === publisherUsername ? 'auto' : '0'} mt-2 rounded-2xl ${message.senderUsername === publisherUsername ? 'bg-blue-500' : 'bg-red-500'}`}>
                  {message.messages}
                </p>
              </div>
              
              

              )
           
              
            })}


            {messages && messages.map((data, index) => (
              <div key={index} className={`flex flex-row items-end gap-2 ${data.sender === 'recive' ? 'justify-start' : 'justify-end'}`}>
                <p className={`h-auto p-3 text-white ml-${data.sender === 'recive' ? '0' : 'auto'} mt-2 rounded-2xl ${data.sender === 'recive' ? 'bg-red-500' : 'bg-blue-500'
                  } f`}>
                  {data.message}
                  <span className='mr-2 text-gray-300 text-[10px] m-2 '>{data.hours}</span>
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