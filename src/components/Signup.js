import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import db, {provider1}from '../base';

const Signup = (props) => {

    const [password, setPassword] = useState("");
    const [Id, setId] = useState("");
    const history = useHistory();

    const passChange = (e) => {
        setPassword(e.target.value);
    };

    const IdChange = (e) => {
        setId(e.target.value);
    };

    const handleSignUp = () => {
        if(!Id.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)){
            alert('Incorrect Email Format');
            return;
        }
        try{
            db.auth().createUserWithEmailAndPassword(Id, password);
            alert('success!')
            history.push("/");
        } catch(error){
            alert(error);
        }
    }

    return (
        <div>
            <MuiThemeProvider>
            <div>
                <AppBar title="Signup"/>
                <TextField
                    hintText="Enter your Email"
                    floatingLabelText="Email"
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
                <RaisedButton label="Sign up" primary={true} style={style} onClick={handleSignUp}/>
            </div>
            </MuiThemeProvider>
        </div>
    );
}
    const style = {margin: 15,};


export default Signup;