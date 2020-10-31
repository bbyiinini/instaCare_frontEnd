import React, { useState }  from "react";
import { useHistory } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const Login = (props) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const history = useHistory();

    // const passChange = (e) => {
    //     setPassword(e.target.value);
    // };
    //
    // const emailChange = (e) => {
    //     setEmail(e.target.value);
    // };


    return (
        <div className="App p-5">
            {/*<MuiThemeProvider>*/}
            {/*<div>*/}
            {/*    <AppBar title="Login"/>*/}
            {/*    <TextField*/}
            {/*        hintText="Enter your Email"*/}
            {/*        floatingLabelText="Email"*/}
            {/*        onChange = {IdChange}*/}
            {/*        />*/}
            {/*    <br/>*/}
            {/*        <TextField*/}
            {/*        type="password"*/}
            {/*        hintText="Enter your Password"*/}
            {/*        floatingLabelText="Password"*/}
            {/*        onChange = {passChange}*/}
            {/*        />*/}
            {/*    <br/>*/}
            {/*    <div>*/}
            {/*        <Link to="/forgot/password" className="text-danger">Forgot Password</Link>*/}
            {/*    </div>*/}
            {/*    <RaisedButton label="Submit" primary={true} style={style} onClick={""}/>*/}
            {/*</div>*/}
            {/*</MuiThemeProvider>*/}
            <h3>LogIn</h3>
            <MuiThemeProvider>
                <div >
                    <TextField
                        hintText="Enter your Email"
                        floatingLabelText="Email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <br/>
                    <button type="Submit" className="btn btn-primary" onClick="">Submit</button>
                </div>
            </MuiThemeProvider>

        </div>

    );
}
    const style = {margin: 15,};


export default Login;