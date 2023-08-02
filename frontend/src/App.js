import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import Home from "./pages/home";
import Login from "./pages/login"
import Input from "./pages/input";
import Navbar from "./pages/navbar"
import View from "./pages/view";
import Profile from './pages/profile';
import Pengajuan from "./pages/pengajuan";
import Kirim from "./pages/kirimarsip";
import Terkirim from './pages/terkirim';

import TestPage from "./pages/testpage";
import TestKirim from "./pages/kirim";

function App() {
  return(
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Login/>}/>
              <Route path="/home" element={<><Navbar/><View/></>}/>
              <Route path="/input" element={<><Navbar/><Input/></>}/>
              <Route path="/testpage" element={<><Navbar/><TestPage/></>}/>
              <Route path="/kirim" element={<><Navbar/><TestKirim/></>}/>
              <Route path="/terkirim" element={<><Navbar/><Terkirim/></>}/>
              <Route path="/profile" element={<><Navbar/><Profile/></>}/>
              <Route path="/pengajuan" element={<><Navbar/><Pengajuan/></>}/>
              <Route path="/view" element={<><Navbar/><View/></>}/>
              <Route path="/testkirim" element={<><Navbar/><Kirim/></>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
