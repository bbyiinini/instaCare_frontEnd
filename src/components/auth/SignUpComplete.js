import React, {useEffect} from "react";
import {auth} from "../../firebase";
import 'react-toastify/dist/ReactToastify.css'

const SignUpComplete = ({history}) => {

    useEffect( () => {
        let email = (window.localStorage.getItem('email'))
        let password = window.localStorage.getItem('password')
        if (email != null) {
            auth.signInWithEmailLink(email,window.location.href).then(r => {
                console.log('success')
                const user = auth.currentUser;
                if (user.emailVerified){
                    user.updatePassword(password).then(r => {
                        console.log('update success')
                        window.localStorage.removeItem('email')
                        window.localStorage.removeItem('password')

                    })
                }
            }).catch(error=>{
                console.log(error)
            })
        }
        history.push("/")
    },[])



    return(
        <div style={{textAlign:"center"}} className="p-5">
            <h1>Sign Up Complete</h1>
        </div>
    );
};

export default SignUpComplete;