import logo from './logo.svg';
import './App.css';
import Header from './views/header/Header';
import HomeScreen from './views/home/HomeScreen';
import FavoritesScreen from './views/FavoritesScreen/FavoritesScreen';
import MyItinerariesScreen from './views/MyItineraries/MyItinerariesScreen';
import ProfileScreen from "./views/profile/ProfileScreen";
import LoginScreen from './views/login/LoginScreen';
import RegisterScreen from './views/register/RegisterScreen';
import Itinerary from './views/Itinerary/Itinerary';
import DetailElement from './views/DetailElement/DetailElement';
import ModifyItinerary from './views/modifyItinerary/ModifyItinerary';
import SearchScreen from './views/search/SearchScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PreguntasFrecuentes from './views/PreguntasFrecuentes/PreguntasFrecuentes'
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
          <Route path="/favorites" element={<FavoritesScreen/>}/>
          <Route path="/MyItineraries" element ={<MyItinerariesScreen/>}/>
          <Route path="/modifyItinerary/:idViaje" element={<ModifyItinerary/>}/>
          <Route path='/searchScreen' element={<SearchScreen/>}/>
          <Route path="/PreguntasFrecuentes" element ={<PreguntasFrecuentes/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
