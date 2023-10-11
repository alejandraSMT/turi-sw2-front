import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Itinerary from './views/Itinerary/Itinerary';
import RegisterScreen from './views/register/RegisterScreen';
import DetailElement from './views/DetailElement/DetailElement';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <BrowserRouter>
      <Routes>
     
          <Route path = "/registro" element = {<RegisterScreen />} />
          <Route path = "/itinerary" element = {<Itinerary />} />
          <Route path = "/detailElement" element = {<DetailElement />} />

      </Routes>
  </BrowserRouter>
</div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();