
import React from 'react'
import { Redirect } from 'react-router-dom'
import Login from '../components/auth/Login';
import {useDispatch, useSelector} from "react-redux";

const ProtectedRoute = ({component: Component}) => {

    const {user} = useSelector((state)=>({...state}))
    
    return user==null ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/' }} />
    );
}

export default ProtectedRoute;