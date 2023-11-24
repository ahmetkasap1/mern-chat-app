import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser : [],
    setToken : "",
    isAuthControl : false,
    logOutControl : false,
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        currentUser: (state, action) => {
            state.currentUser = action.payload
        },
        isAuthControl: (state, action) => {
            state.isAuthControl = action.payload
        },
        logOutControl: (state, action) => {
            state.logOutControl = action.payload
        },
        setToken : (state, action) => {
            state.setToken = action.payload
        }
    }
})



export const { isAuthControl, logOutControl, setToken, currentUser } = authSlice.actions  
export default authSlice.reducer