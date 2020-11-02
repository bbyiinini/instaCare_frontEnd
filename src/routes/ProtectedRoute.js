
import React from 'react'
import { Redirect } from 'react-router-dom'
import Login from '../components/Login';
import {useDispatch, useSelector} from "react-redux";

const ProtectedRoute = () => {

    const {user} = useSelector((state)=>({...state}))

    const isAuthenticated = user.token;
    
    return isAuthenticated ? (
        <Login />
    ) : (
        <Redirect to={{ pathname: '/' }} />
    );
}

export default ProtectedRoute;