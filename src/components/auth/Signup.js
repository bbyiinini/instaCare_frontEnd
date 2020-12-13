import React, { useState }  from "react";
import { useHistory, Link} from "react-router-dom";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import senior from '../../assets/senior.jpeg'
import volunteer from '../../assets/volunteer.png'
import googlePNG from '../../assets/google.png'
import welcome from '../../assets/welcome.jpg'

import { createMuiTheme,makeStyles, styled, withStyles} from '@material-ui/core/styles';

import db, {provider1}from '../../base';
import {toast} from "react-toastify";

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 100,
            },
        },
    },
})

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

const Signup = (props) => {
    const classes = useStyles()
    let history = useHistory()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState(0);
    const [seniorBorder, setSenior] = useState("");
    const [volunteerBorder, setVolunteer] = useState("");


    const passChange = (e) => {
        setPassword(e.target.value);
    };

    const emailChange = (e) => {
        setEmail(e.target.value);
    };

    const typeChange = (type) => {
        setType(type)
        if(type){
            setSenior("")
            setVolunteer("2px solid #12897b")
        }else{
            setVolunteer("")
            setSenior("2px solid #12897b")
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


    const nameChange = (e) => {
        setName(e.target.value);
    };

    const handleSignUp = async (e) => {
        e.preventDefault()

        // if (!email || !password) {
        //     toast.error("email and password are required")
        //     return;
        // }
        // if (password.length < 6) {
        //     toast.error("password must be more than 6 character long")
        //     return;
        // }
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
            url: 'http://instacare.today/signupcomplete',
            handleCodeInApp: true,
        }

        let result = await db.auth().fetchSignInMethodsForEmail(email)

        if (result.length === 0){
            await db.auth().sendSignInLinkToEmail(email, actionSetting)
            toast.success(`Email is sent to ${email}, please confirm your email and continue to complete sign up`);

            window.localStorage.setItem('email', email)
            window.localStorage.setItem('password', password)
            window.localStorage.setItem('userType', type)
        }else {
            toast.error("Email has already registered, please use another email")
        }


    };

    return (
        <div style={{overflow:'hidden'}}>
            <MuiThemeProvider theme={theme}>
                <Grid container spacing={0} style={{marginTop:"100px"}}>
                    <Grid item xs={6}>
                        <img src={welcome} style={{width:"600px",marginLeft:"-10px",marginTop:"-100px"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <br/>
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
                                    placeholder={"Enter Password"}
                                    onChange = {passChange}
                                    type={"password"}
                                />
                            </div>
                            <br/>
                            <Button label="Sign up"
                                    style={{backgroundColor:"#12897b", color:"white"}}
                                    className={classes.textfield}
                                    onClick={handleSignUp}>Sign Up</Button>

                            <div style={{textAlign:"center"}}>
                                <br/>
                                Or join us with
                                <br/>
                                <img src={googlePNG} onClick={handleLoginWithGoogle} style={{width:'30px'}}/>
                                <br/>
                                Already Have an account? <Link style={{color:"#12897b"}} to={"/login"}><b>Sign In</b></Link>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </div>
    );
}
    const style = {margin: 15,};


export default Signup;