import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CreatePost, EditPost, PostDetails, SignIn, SignUp, Profile } from './pages';
import { Navbar } from './components';
import { useDispatch } from 'react-redux';
import { getUser } from './features/authSlice';
import { getPosts } from './features/postsSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [])
  
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/:id' element={<PostDetails/>} />
        <Route path='/edit-post/:id' element={<EditPost />} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

