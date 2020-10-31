import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Link} from "react-router-dom";

const Login = (props) => {

    const [password, setPassword] = useState("");
    const [Id, setId] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const history = useHistory();

    const passChange = (e) => {
        setPassword(e.target.value);
    };

    const IdChange = (e) => {
        setId(e.target.value);
    };

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
                <div>
                    <Link to="/forgot/password" className="text-danger">Forgot Password</Link>
                </div>
                <RaisedButton label="Submit" primary={true} style={style} onClick={""}/>
            </div>
            </MuiThemeProvider>
        </div>

    );
}
    const style = {margin: 15,};


export default Login;