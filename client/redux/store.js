'use client'
import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth'
export const store = configureStore({
  reducer: {
   auth : auth
  },
})