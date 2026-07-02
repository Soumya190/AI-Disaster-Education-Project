// import Signup from './components/Signup'
import Signup from './components/Signup'

import './App.css'
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { PageNotFound } from './components/PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Homepage from './components/Homepage'
import About from './app/about/page'
import Features from './app/features/page'
import Alerts from './components/Alerts'

function App() {

  const isAuthenticated = () => {
    const userInfo = localStorage.getItem('user-info');
    if (!userInfo) return false;

    try {
      const parsed = JSON.parse(userInfo);
      
      return !!parsed.token;
    } catch (error) {
      return false;
    }
  };

  console.log("isAuthenticated:",isAuthenticated());

  const clientID = '1034823575253-7muj29cpa2tt48kob2brue9hafp75ide.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <BrowserRouter>
        <Routes>
          
          <Route
            path='/'
            element={isAuthenticated() ? <Navigate to="/homepage" replace /> : <Navigate to="/signup" replace />}
          />

          
          <Route
            path='/signup'
            element={isAuthenticated()  ? <Navigate to="/homepage" replace /> : <Signup />}
          />
          <Route
            path='/login'
            element={isAuthenticated()  ? <Navigate to="/homepage" replace /> : <Login />}
          />

         
          <Route
            path='/homepage'
            element={isAuthenticated()  ? <Homepage /> : <Navigate to="/signup" replace />}
          />

          
          <Route path='/about' element={<About />} />
          <Route path='/alerts' element={<Alerts />} />
          <Route path='/features' element={<Features />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
