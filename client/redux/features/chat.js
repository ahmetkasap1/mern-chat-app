'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState = {
    controller : [],
   
}


const token = Cookies.get('token')

export const openChat = createAsyncThunk('openChat', async(username) => {
    console.log(username)
    const response = await fetch(`http://localhost:5000/api/v1/chat/${username}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    const data = await response.json()
    
    return data
})

export const chatSlice = createSlice({
    name : 'chat',
    initialState,
    reducers : {
    
    },
    extraReducers : (builder) => {
        builder.addCase(openChat.fulfilled , (state, action) => {      //işlem bekleniyor.
            state.controller = action.payload
           
        }) 
       
    }

})

export default chatSlice.reducer