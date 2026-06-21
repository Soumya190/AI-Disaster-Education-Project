// import Signup from './components/Signup'
import Signup from './components/Signup'

import './App.css'
import {Navigate, BrowserRouter, Route, Routes, redirect } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={`/Signup`}/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
