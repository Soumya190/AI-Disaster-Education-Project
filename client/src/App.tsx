// import React from 'react'
import Signup from './components/Signup'
import './App.css'
import { Navigate, BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Login from './components/Login'
import { PageNotFound } from './components/PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Homepage from './components/Homepage'
import About from './app/about/page'
import Features from './app/features/page'
import Alerts from './components/Alerts'
import Modules from './app/features/modules/page'
import Drills from './components/Drills'
import Analysis from './components/Analysis'
import EarthquakeModule from './app/features/modules/earthquake/page'
import FloodModule from './app/features/modules/flood/page'
import CycloneModule from './app/features/modules/cyclone/page'
import HeatwavesModule from './app/features/modules/heatwaves/page'
import DroughtModule from './app/features/modules/drought/page'

const checkAuthStatus = (): boolean => {
  const userInfo = localStorage.getItem('user-info');
  if (!userInfo) return false;

  try {
    const parsed = JSON.parse(userInfo);
    return !!(parsed && (parsed.email || parsed.token));
  } catch (error) {
    return false;
  }
};

const ProtectedRouteGuard = () => {
  return checkAuthStatus() ? <Outlet /> : <Navigate to="/signup" replace />;
};

const PublicRouteGuard = () => {
  return !checkAuthStatus() ? <Outlet /> : <Navigate to="/homepage" replace />;
};

function App() {
  const clientID = '1034823575253-7muj29cpa2tt48kob2brue9hafp75ide.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <BrowserRouter>
        <Routes>
          
          <Route
            path='/'
            element={checkAuthStatus() ? <Navigate to="/homepage" replace /> : <Navigate to="/signup" replace />}
          />

          <Route element={<PublicRouteGuard />}>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<ProtectedRouteGuard />}>
            <Route path='/homepage' element={<Homepage />} />
          </Route>

          <Route path='/about' element={<About />} />
          <Route path='/alerts' element={<Alerts />} />
          <Route path='/features' element={<Features />} />
          <Route path='/features/modules' element={<Modules/>}/>
          <Route path='/drills' element={<Drills/>}/>
          <Route path='/alerts' element={<Alerts/>}/>
          <Route path='/analysis' element={<Analysis/>}/>
          <Route path='/earthquake' element={<EarthquakeModule/>}/>
          <Route path='/flood' element={<FloodModule/>}/>
          <Route path='/cyclone' element={<CycloneModule/>}/>
          <Route path='/heatwave' element={<HeatwavesModule/>}/>
          <Route path='/drought' element={<DroughtModule/>}/>
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App;