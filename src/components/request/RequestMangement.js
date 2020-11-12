import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

const RequestMangement = () => {

    let {user} = useSelector((state)=>({...state}));

    const history = useHistory();

    const backHome = () =>{
        history.push('/')
    }

    return(
        <>
           {user==null?
           <div>
               <p>waiting for redirection, back to <a onClick={backHome}>home</a></p>
           </div>
           :<div>
               <h1>Hello</h1>
            </div>}
        </>
    );
}

export default RequestMangement;