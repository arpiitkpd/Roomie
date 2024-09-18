import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.js';
import profileSlice from './profileSlice.js';
const store = configureStore({
    reducer:{
        auth: authSlice,
        prof: profileSlice
    }
});

export default store;