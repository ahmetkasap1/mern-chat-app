'use client'
import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth'
import chat from './features/chat'

export const store = configureStore({
  reducer: {
   auth : auth,
   chat : chat
  },
})