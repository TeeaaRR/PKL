import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useNavigate();

    useEffect(() =>{
        refreshToken();
    },[]);

    const refreshToken = async() =>{
        try{
            const response = await axios.get('http://localhost:3001/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }catch (error){
            if (error.response){
                history("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:3001/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) =>{
        return Promise.reject(error);
    });

    const getUsers = async() => {
        const response = await axiosJWT.get('http://localhost:3001/users',{
            headers:{
                Authorization :`Bearer ${token}`
            }
        });
        console.log(response.data);
    }
};

export default Auth;