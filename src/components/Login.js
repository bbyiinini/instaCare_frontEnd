import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import db, {provider1}from '../base';

const Login = (props) => {

    const [password, setPassword] = useState("");
    const [Id, setId] = useState("");
    const history = useHistory();

    const passChange = (e) => {
        setPassword(e.target.value);
    };

    const IdChange = (e) => {
        setId(e.target.value);
    };

    const handleLoginWithGoogle = async () => {
        try{
           await db.auth().signInWithPopup(provider1);
            history.push("/");
        } catch (error){
            alert(error);
        }
    }

    const redirectSignup = () =>{
        history.push("/signup");
    }

    return (
        <div>
            <MuiThemeProvider>
            <div>
                <AppBar title="Login"/>
                <TextField
                    hintText="Enter your Username"
                    floatingLabelText="Username"
                    onChange = {IdChange}
                    />
                <br/>
                    <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {passChange}
                    />
                <br/>
                <RaisedButton label="Submit" primary={true} style={style} onClick={handleLoginWithGoogle}/>
                <RaisedButton label="Sign Up" primary={true} style={style} onClick={redirectSignup}/>
            </div>
            </MuiThemeProvider>
        </div>
    );
}
    const style = {margin: 15,};


export default Login;