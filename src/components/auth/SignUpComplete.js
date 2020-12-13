import React, {useEffect} from "react";
import db from "../../base";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom"
import UserService from "../../service/UserService";

const SignUpComplete = ({props}) => {
    let history = useHistory()
    useEffect( () => {
        let email = (window.localStorage.getItem('email'))
        let password = window.localStorage.getItem('password')
        let userType = window.localStorage.getItem('userType')
        let UserBean = {usertype: parseInt(userType)};
        if (email != null) {
            db.auth().signInWithEmailLink(email, window.location.href).then( async ()=>{
                toast.success("Sign Up success")
                // test CORS
                // await UserService.saveUser(UserBean).then(res=>{
                //     toast.success("saved user type to backend")
                // }).catch(res=>{
                //     console.log("CORS not connected")
                // })
                let user = db.auth().currentUser;
                if (db.auth().currentUser.emailVerified){
                    await user.updatePassword(password)
                    console.log("update success")
                }
                //pass uid to backend
                // await UserService.registed(user.uid, UserBean).then(res=>{
                //     toast.success("saved user type to backend")
                // }).catch(res=>{
                //     console.log("CORS not connected")
                // })
                history.push("/finishSetUp")
            }).catch((error)=>{
                console.log(error)
            })
        }
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('password')
    window.localStorage.removeItem('userType')
    },[])

    return (
        <div style={{textAlign:"center"}}>
            <h1>Sign Up complete, directing to set profile page....</h1>
        </div>
    )
};

export default SignUpComplete;