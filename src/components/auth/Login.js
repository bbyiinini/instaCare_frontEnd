import React, { useState }  from "react";
import { useHistory, Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from 'material-ui/TextField';
import db, {provider1}from '../../base';
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";

import { createMuiTheme,makeStyles, styled, withStyles} from '@material-ui/core/styles';

import welcome from '../../Assets/welcome.png'
import googlepng from '../../Assets/google.png'


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
    },
    textfield:{
        borderStyle: "solid",
        borderRadius: "100px",
        borderWidth: "1px",
        width:"50%",
        margin:"auto",
        textAlign:"center"
    },
    imgstyle:{
        width:"100px",
        height:"100px",
        borderRadius:"50%",
        margin:"10px"
    }
});

const Login = (props) => {

    const [password, setPassword] = useState("");
    const [email, seEmail] = useState("");
    const history = useHistory();
    const classes = useStyles()

    const passChange = (e) => {
        setPassword(e.target.value);
    };

    const emailChange = (e) => {
        seEmail(e.target.value);
    };

    const handleLoginWithEmailAndPassword = async (e) => {
        e.preventDefault();
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
            toast.error("log in failed, make sure your email and password are correct")
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


    return (
        <div>
            <MuiThemeProvider>
                <Grid container spacing={2} style={{paddingTop:"100px"}}>
                    <Grid item xs={6}>
                        <img src={welcome} style={{width:"600px"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <h2 style={{marginBottom:"20px"}}>Welcome Back to instaCare</h2>
                            <Button label="Login with google"
                                    style={{marginBottom:"20px"}}
                                    className={classes.textfield}
                                    onClick={handleLoginWithGoogle}
                            >Sign in with Google <img style={{width:"30px",marginLeft:"20px"}} src={googlepng}/></Button>
                            <div style={{marginBottom:"20px"}}>Or</div>
                            <div className={classes.textfield}>
                                <Input
                                    disableUnderline
                                    style={{width:"80%"}}
                                    placeholder={"Email"}
                                    onChange = {emailChange}
                                />
                            </div>
                            <br/>
                            <div className={classes.textfield}>
                                <Input
                                    disableUnderline
                                    style={{width:"80%"}}
                                    placeholder={"Password"}
                                    onChange = {passChange}
                                    type="password"
                                />
                            </div>
                            <br/>
                            <Link to="/forgot/resetpassword" style={{color:"#12897b"}}>Forgot Password</Link>
                            <br/>
                            <br/>
                            <Button label="Login"
                                    style={(!email || password.length < 6) ? {} : {backgroundColor:"#12897b", color:"white"}}
                                    className={classes.textfield}
                                    disabled={!email || password.length < 6}
                                    onClick={handleLoginWithEmailAndPassword}
                            >Log In</Button>
                        </div>

                    </Grid>
                </Grid>

            </MuiThemeProvider>
        </div>
    );
}
    const style = {margin: 15,};


export default Login;