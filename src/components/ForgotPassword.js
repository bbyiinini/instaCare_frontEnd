import React, { useState, useEffect }  from "react";
import { useHistory } from "react-router-dom";
import db, {provider1}from '../base';
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = () => {

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
                <button className="btn btn-primary" disabled={!email}>Change Password</button>
            </form>
        </div>

    )
}

const style = {width: "300px", margin:"0 auto"}
export default ForgotPassword;