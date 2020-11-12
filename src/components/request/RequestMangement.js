import { blue, red } from "@material-ui/core/colors";
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

const RequestMangement = () => {

    let {user} = useSelector((state)=>({...state}));

    const history = useHistory();

    const backHome = () =>{
        history.push('/');
    }

    return(
        <>
           {user==null?
           <div>
               <p>waiting for redirection, back to <a onClick={backHome} style={{color:"blue"}}>HOME</a></p>
           </div>
           :<div className="row">
                <div className="column">
                    Display
                </div>
                <div className="column">
                    Map
                </div>
            </div>}
        </>
    );
}

export default RequestMangement;