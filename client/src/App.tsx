// import Signup from './components/Signup'
import Signup from './components/Signup'

import './App.css'
import {Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { PageNotFound } from './components/PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Homepage from './components/Homepage'
import About from './app/about/page'
import Features from './app/features/page'
import Alerts from './components/Alerts'

function App() {

  const GoogleAuthWrapper=()=>{
    return(
    <GoogleOAuthProvider clientId='1034823575253-7muj29cpa2tt48kob2brue9hafp75ide.apps.googleusercontent.com'>
      <Signup/>
    </GoogleOAuthProvider>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={`/Signup`}/>}></Route>
        <Route path='/signup' element={<GoogleAuthWrapper/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/homepage' element={<Homepage/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/alerts' element={<Alerts/>}></Route>
        <Route path='/features' element={<Features/>}></Route>
        <Route path='/*' element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
