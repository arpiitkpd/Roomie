import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import profileSlice from './profileSlice.js';
import { saveState, loadState } from './helper.js'; // The helper functions

// Load persisted state
const persistedState = loadState();

// Configure store with persisted state
const store = configureStore({
  reducer: {
    auth: authSlice,
    prof: profileSlice,
  },
  preloadedState: persistedState, // Pass the loaded state as the initial state
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
