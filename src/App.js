import logo from './logo.svg';
import './App.css';
import HomeScreen from './views/home/HomeScreen';
import ProfileScreen from "./views/profile/ProfileScreen";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App(){
  return (
      <div>
          <BrowserRouter>
              <Routes>

                  <Route path = "/" element = {<HomeScreen />} />
                  <Route path="/profile" element={<ProfileScreen/>} />

              </Routes>
          </BrowserRouter>
      </div>
  )
}
