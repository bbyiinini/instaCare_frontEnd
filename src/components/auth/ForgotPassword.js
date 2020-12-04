import React, { useState, useEffect }  from "react";
import db, {provider1}from '../../base';
import {toast} from "react-toastify";
import forgot from '../../assets/forgot.png'
import {useHistory} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import welcome from "../../assets/welcome.png";
import {makeStyles} from "@material-ui/core/styles";

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
        textAlign:"center",
        height:"50px"
    },
    imgstyle:{
        width:"100px",
        height:"100px",
        borderRadius:"50%",
        margin:"10px"
    }
});


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const history = useHistory()
    const classes = useStyles()
    const handleSubmit = async e => {
        e.preventDefault();

        const actionSetting = {
            url: 'http://localhost:3000/login',
            handleCodeInApp: true,
        }
        // console.log(email)
        await db.auth().sendPasswordResetEmail(email, actionSetting).then(res=>{
            setEmail('')
            toast.success(`Email is sent to ${email}, please confirm your email and continue to complete PasswordReset`);
        }).catch(error=>{
            toast.error(error.message)
            console.log(error.message)
        })
    }

    const handleCancel = () => {
        history.push("/")
    }

    return (
        <div>
            <MuiThemeProvider>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <img src={forgot} style={{width:"600px"}}/>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:"200px"}}>
                        <h4>Please enter your email address to get the reset password link</h4>
                        <input type="email"
                               className={classes.textfield}
                               value={email}
                               onChange={e=>setEmail(e.target.value)}
                               placeholder="Enter your email"
                        />
                        <br/>
                        <div>
                            <Button style={{width:"30%", margin:"20px", backgroundColor:"#12897b", color:"white"}} className={classes.textfield} onClick={handleSubmit} >Send Me an Email</Button>
                            <Button style={{width:"30%", margin:"20px"}} className={classes.textfield} onClick={handleCancel}>Cancel </Button>
                        </div>

                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </div>

    )
}

const style = {width: "300px", margin:"0 auto"}
export default ForgotPassword;

