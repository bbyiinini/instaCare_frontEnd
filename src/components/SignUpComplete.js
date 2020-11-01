import React, {useEffect} from "react";
import db from "../base";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom"

const SignUpComplete = ({props}) => {
    let history = useHistory()
    useEffect( () => {
        let email = (window.localStorage.getItem('email'))
        let password = window.localStorage.getItem('password')
        if (email != null) {
            db.auth().signInWithEmailLink(email, window.location.href).then(()=>{
                toast.success("Sign Up success")
                 let user = db.auth.currentUser;
                 if (user.emailVerified){
                     user.updatePassword(password).then(() => {
                         console.log('update success')
                         window.localStorage.removeItem('email')
                         window.localStorage.removeItem('password')
                     })
                 }
            }).catch((error)=>{
                console.log(error)
            })
        }
    history.push("/")
    },[])

    return (
        <div style={{textAlign:"center"}}>
            <h1>Sign Up complete</h1>
        </div>
    )
};

export default SignUpComplete;