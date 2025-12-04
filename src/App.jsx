import { useEffect, useState,createContext } from 'react'
import './App.css'
import { BloodProvider } from './context/BloodContext'
import AppRoutes from './routes/AppRoutes'
import 'aos/dist/aos.css'
import Aos from 'aos'

function App() { 
  useEffect(() => {
    Aos.init({ duration: 1000, easing: 'ease-in-out' })
  }, []);
  return(
    <BloodProvider>
      <AppRoutes />
    </BloodProvider>
  )
}

export default App
