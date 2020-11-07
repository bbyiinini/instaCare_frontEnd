import React, { useState, useEffect }  from "react";
import db, {provider1}from '../base';
import {toast} from "react-toastify";




const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = async e => {
        e.preventDefault();

        const actionSetting = {
            url: 'http://localhost:3000/signup/complete',
            handleCodeInApp: true,
        }
        // console.log(email)
        await db.auth().sendPasswordResetEmail(email, actionSetting)
        toast.success(`Email is sent to ${email}, please confirm your email and continue to complete PasswordReset`);
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <h4>Forgot Password</h4>
            <form onSubmit={handleSubmit}>
                <input type="email" style={style} className="form-control" value={email} onChange={e=>setEmail(e.target.value)}
                       placeholder="Enter your email"
                       autoFocus
                />
                <br/>
                <button className="btn btn-primary" onClick={handleSubmit} >Change Password</button>
            </form>
        </div>

    )
}

const style = {width: "300px", margin:"0 auto"}
export default ForgotPassword;

