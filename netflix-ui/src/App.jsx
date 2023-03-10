import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Player from './components/Player'
import Login from './pages/Login'
import Movies from './pages/Movies'
import Netflix from './pages/Netflix'
import SignUp from './pages/SignUp'
import UserLiked from './pages/UserLiked'

export default function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/signup' element={<SignUp/>} />
      <Route exact path='/' element={<Netflix/>} />
      <Route exact path='/player' element={<Player/>} />
      <Route exact path='/movies' element={<Movies/>} />
      <Route exact path='/mylist' element={<UserLiked/>} />
    </Routes> 
    </BrowserRouter>
  )
}
