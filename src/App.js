import logo from './logo.svg';
import './App.css';
import HomeScreen from './views/home/HomeScreen';
import ProfileScreen from "./views/profile/ProfileScreen";
import LoginScreen from './views/login/LoginScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App(){
  return (
      <div>
          <BrowserRouter>
              <Routes>

                  <Route path = "/" element = {<LoginScreen />} />
                  <Route path="/home" element={<HomeScreen/>} />
                  <Route path="/profile" element={<ProfileScreen/>} />

              </Routes>
          </BrowserRouter>
      </div>
  )
}
