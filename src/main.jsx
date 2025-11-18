import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import './index.css';
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </StrictMode>,
);
