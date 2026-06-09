import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import Login from "./pages/login"
import Input from "./pages/input";
import Navbar from "./pages/navbar"
import View from "./pages/view";
import Profile from './pages/profile';
import Pengajuan from "./pages/pengajuan";
import Edit from "./pages/editarsip";

import NavbarUser from "./pages/navbar_user"
import ProfileUser from './pages/profile_user';
import InputUser from "./pages/input_user";
import ViewUser from "./pages/view_user";

import NavbarAdmin from './pages/navbar_admin';
import AddUser from './pages/adduser';
import UserView from './pages/viewuser';

function App() {
  // Komponen proteksi role
  const RequireRole = ({role, children}) => {
    const userRole = localStorage.getItem('role');
    if(Array.isArray(role)) {
      if(role.includes(userRole) || role.includes(String(userRole))) {
        return children;
      }
    } else {
      if(userRole === role || userRole === String(role)) {
        return children;
      }
    }
    return <div className="p-8 text-red-600">Akses ditolak: Anda tidak memiliki hak akses ke halaman ini.</div>;
  };

  return(
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Login/>}/>
              <Route path="/home" element={<RequireRole role={["2"]}><Navbar/><View/></RequireRole>}/>
              <Route path="/input" element={<RequireRole role={["2"]}><Navbar/><Input/></RequireRole>}/>
              <Route path="/pengajuan" element={<RequireRole role={["2"]}><Navbar/><Pengajuan/></RequireRole>}/>
              <Route path="/profile" element={<RequireRole role={["2"]}><Navbar/><Profile/></RequireRole>}/>
              <Route path="/edit/:id" element={<RequireRole role={["2"]}><Navbar/><Edit/></RequireRole>}/>
              
              <Route path="/profileUser" element={<RequireRole role={["3"]}><NavbarUser/><ProfileUser/></RequireRole>}/>
              <Route path="/homeUser" element={<RequireRole role={["3"]}><NavbarUser/><ViewUser/></RequireRole>}/>
              <Route path="/inputUser" element={<RequireRole role={["3"]}><NavbarUser/><InputUser/></RequireRole>}/>

              <Route path="/adduser" element={<RequireRole role={["1"]}><NavbarAdmin/><AddUser/></RequireRole>}/>
              <Route path="/homeAdmin" element={<RequireRole role={["1"]}><NavbarAdmin/><UserView/></RequireRole>}/>
              <Route path="/profileAdmin" element={<RequireRole role={["1"]}><NavbarAdmin/><Profile/></RequireRole>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
