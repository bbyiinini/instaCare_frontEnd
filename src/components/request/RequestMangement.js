import { blue, red } from "@material-ui/core/colors";
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

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
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={''}>
                            R
                        </Avatar>
                        }
                        title={<><a>{user.displayName}</a><div>{user.email}</div></>}
                        subheader="GPA: 4.0"
                    />
                </div>
                <div className="column">
                    Map
                </div>
            </div>}
        </>
    );
}

export default RequestMangement;