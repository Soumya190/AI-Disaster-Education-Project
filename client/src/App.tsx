// import Signup from './components/Signup'
import Signup from './components/Signup'

import './App.css'
import {Navigate, BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import Login from './components/Login'
import { PageNotFound } from './components/PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
        <Route path='/*' element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
