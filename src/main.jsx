import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter, RouterProvider} from "react-router-dom"


import Protected from './components/AuthLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import ProfileForm from './pages/ProfileForm.jsx'
import Profile from './pages/Profile.jsx'
import QueryPosts from './pages/QueryPosts.jsx'
import Test from './pages/Test.jsx'
import Setting from './pages/Setting.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path: "/login",
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path: "/signup",
        element:(
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        )
      },
      {
        path: "/all-rooms",
        element:(
         
          <AllPosts/>
        )
      },
      {
        path: "/add-room",
        element:(
          <Protected authentication>
            <AddPost/>
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element:(
          <Protected authentication>
            <EditPost/>
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element:(
            <Post/>
        )
      },
      {
        path: "/test",
        element:(
            <Test/>
        )
      },
      {
        path: "/profile-form",
        element:(
          <ProfileForm/>
        )
      },
      {
        path: "/rooms/:query",
        element:(
          <QueryPosts/>
        )
      },
      {
        path: "/profile/:slug",
        element:(
          
            <Profile/>
         
        )
      },
      {
        path: "/setting",
        element:(
          
            <Setting/>
         
        )
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
