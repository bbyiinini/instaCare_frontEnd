import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import db, {provider1}from '../base';
import {Button} from "antd";
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {toast, ToastContainer} from "react-toastify";


const Login = (props) => {

    const [password, setPassword] = useState("");
    const [email, seEmail] = useState("");
    const history = useHistory();

    const passChange = (e) => {
        setPassword(e.target.value);
    };

    const emailChange = (e) => {
        seEmail(e.target.value);
    };

    const handleLoginWithEmailAndPassword = async (e) => {
        e.preventDefault();
        // console.log(email, password)
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
            toast.error("You have entered an invalid email address!")
        }

        try {
          await db.auth().signInWithEmailAndPassword(email,password).then(()=>{
              toast.success("log in success")
          })
            history.push("/");
        }catch (error) {
            console.log(email,password)
            console.log(error)
            toast.error("log in failed")
        }

    }

    const handleLoginWithGoogle = async () => {
        try{
           await db.auth().signInWithPopup(provider1).then(()=>{
               toast.success("Login success!")
           });

            history.push("/");
        } catch (error){
            alert(error);
        }
    }

    // const redirectSignup = () =>{
    //     history.push("/signup");
    // }

    return (
        <div>
            <MuiThemeProvider>
            <div>
                <AppBar title="Login"/>
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
                <Button className="m-3" type="danger" shape="round" icon={<GoogleOutlined />} onClick={handleLoginWithGoogle}>Login with Google</Button>
                <br/>
                {/*<RaisedButton label="Login with google" primary={true} style={style} onClick={handleLoginWithGoogle}/>*/}
                <Button className="m-2" type="primary" shape="round" icon={<MailOutlined/>}disabled={!email || password.length < 6} onClick={handleLoginWithEmailAndPassword}>Login with Email/Password</Button>
                {/*<RaisedButton label="Login with Email and Password" primary={true} style={style} onClick={handleLoginWithEmailAndPassword}/>*/}
                {/*<RaisedButton label="Sign Up" primary={true} style={style} onClick={redirectSignup}/>*/}
            </div>
            </MuiThemeProvider>
        </div>
    );
}
    const style = {margin: 15,};


export default Login;