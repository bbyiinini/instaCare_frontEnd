import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import db, {provider1}from '../base';
import {toast} from "react-toastify";

const Signup = (props) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();


    const passChange = (e) => {
        setPassword(e.target.value);
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("email and password are required")
            return;
        }
        if (password.length < 6) {
            toast.error("password must be more than 6 character long")
            return;
        }
        if (!email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            toast.error("You have entered an invalid email address!")
            return;
        }
        //     try{
        //         await db.auth().createUserWithEmailAndPassword(email, password);
        //         alert('success!')
        //         history.push("/");
        //     } catch(error){
        //         alert(error);
        //     }
        // }
        const actionSetting = {
            url: 'http://localhost:3000/signup/complete',
            handleCodeInApp: true,
        }
        // console.log(email)
        await db.auth().sendSignInLinkToEmail(email, actionSetting)
        toast.success(`Email is sent to ${email}, please confirm your email and continue to complete sign up`);

        window.localStorage.setItem('email', email)
        window.localStorage.setItem('password', password)
        window.localStorage.setItem('userType', "123")
        setEmail("")
        setPassword("")
    };

    return (
        <div>
            <MuiThemeProvider>
            <div>
                <AppBar title="Signup"/>
                <TextField
                    hintText="Enter your Email"
                    floatingLabelText="Email"
                    onChange = {emailChange}
                    />
                <br/>
                    <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {passChange}
                    />
                <br/>
                <RaisedButton label="Sign up" primary={true} style={style} onClick={handleSignUp}/>
            </div>
            </MuiThemeProvider>
        </div>
    );
}
    const style = {margin: 15,};


export default Signup;