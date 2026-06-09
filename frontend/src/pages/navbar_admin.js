import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../utils/auth";import { NavLink, useNavigate } from "react-router-dom";
import 'flowbite';

const Navbar = () => {
  const history = useNavigate();
  Auth();
  const [view, setView] = useState([]);
  useEffect(() => {
      getView();
  }, []);

  const getView = async () => {
      try {
          const accessToken = localStorage.getItem("accessToken"); 
          // waktu login simpan accessToken di localStorage
          const response = await axios.get("http://localhost:3001/profile", {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
          });
          setView(response.data.result);
      } catch (error) {
          console.log(error);
      }
  };

  const Logout = async() => {
    try {
        await axios.delete('http://localhost:3001/logout');
        history('/');
    } catch (error) {
        console.log(error);
    }
  }

  return (
  <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div className="container flex flex-wrap items-center justify-between mx-auto">
      <a href="../homeAdmin" className="flex items-center">
        {/* <img src="../public/image.png" className="h-6 mr-3 sm:h-9"/> */}
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SI DAFA</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="flex items-center flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NavLink to="../homeAdmin" className={({ isActive }) => isActive ? "block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:p-0 dark:text-blue-500" : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>Home</NavLink>
          </li>
          <li>
            <NavLink to="../adduser" className={({ isActive }) => isActive ? "block py-2 pl-3 pr-4 text-blue-700 rounded md:bg-transparent md:p-0 dark:text-blue-500" : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}>input baru</NavLink>
          </li>
          <li>
            <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                className="flex items-center gap-2 pr-4 text-gray-700
                           rounded hover:bg-gray-100 md:hover:bg-transparent 
                           md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400">
                <span>{view.username}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
              <div id="dropdownDivider" className="hidden z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow">
                <ul className="py-1" aria-labelledby="dropdownDividerButton">
                  <li>
                    <NavLink to="../profileAdmin" className={({ isActive }) => isActive ? "text-left block py-2 px-4 text-sm text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" : "text-left block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"}>Profile</NavLink>
                  </li>
                  <li>
                    <button onClick={Logout} className="flex w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Logout</button>
                  </li>
                </ul>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    )
}

export default Navbar;