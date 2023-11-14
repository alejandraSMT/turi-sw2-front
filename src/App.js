import logo from './logo.svg';
import './App.css';
import HomeScreen from './views/home/HomeScreen';
import ProfileScreen from "./views/profile/ProfileScreen";
import LoginScreen from './views/login/LoginScreen';
import RegisterScreen from './views/register/RegisterScreen';
import Itinerary from './views/Itinerary/Itinerary';
import DetailElement from './views/DetailElement/DetailElement';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
  <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/registro" element={<RegisterScreen />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/detailElement/:idLugar" element={<DetailElement />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}
