import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth.js";
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index.js';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <p>Loading...</p> {/* Replace with a spinner if preferred */}
        </div>
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
