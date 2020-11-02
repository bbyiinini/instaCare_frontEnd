import React, {useEffect} from "react";
import db from "../base";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom"
import UserService from "../service/UserService";

const SignUpComplete = ({props}) => {
    let history = useHistory()
    useEffect( () => {
        let email = (window.localStorage.getItem('email'))
        let password = window.localStorage.getItem('password')
        let userType = window.localStorage.getItem('userType')
        let UserBean = {userType:userType}
        if (email != null) {
            db.auth().signInWithEmailLink(email, window.location.href).then( async ()=>{
                toast.success("Sign Up success")
                // test CORS
                await UserService.saveUser(UserBean).then(res=>{
                    toast.success("saved user type to backend")
                })
                let user = db.auth().currentUser;
                 // console.log(user)
                if (db.auth().currentUser.emailVerified){
                await user.updatePassword(password)
                }

            }).catch((error)=>{
                console.log(error)
            })
        }
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('password')
    window.localStorage.removeItem('userType')
    history.push("/")
    },[])

    return (
        <div style={{textAlign:"center"}}>
            <h1>Sign Up complete</h1>
        </div>
    )
};

export default SignUpComplete;