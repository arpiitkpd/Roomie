import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    status: false,
  
}

const profileSlice = createSlice({
    name: 'prof',
    initialState,
    reducers:{
        profile:(state)=>{
            state.status = true;
        },
        
    }
})

export const{profile} = profileSlice.actions 

export default profileSlice.reducer;