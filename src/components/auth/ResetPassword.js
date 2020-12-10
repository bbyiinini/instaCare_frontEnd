import React, { useState, useEffect }  from "react";
import db, {provider1}from '../../base';
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Reset from "../../assets/Reset.png";
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
    height:"50px",
    marginBottom:"20px"
  },
  imgstyle:{
    width:"100px",
    height:"100px",
    borderRadius:"50%",
    margin:"10px"
  }
});


const ResetPassword = () => {


  const history = useHistory()
  const [currpassword, setCurrPassword] = useState("")
  const [password, setPassword] = useState("");
  const [comfpassword, setcomfPassword] = useState("");
  const classes = useStyles()


  const currpassChange = (e) => {
    setCurrPassword(e.target.value);
  };

  const passChange = (e) => {
    setPassword(e.target.value);
  };

  const comfpassChange = (e) => {
    setcomfPassword(e.target.value);
  };



  const handleReset = async e => {

    let user = db.auth().currentUser;


    let emailCred = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currpassword)

    if (currpassword === ""){
      toast.error("Please enter the old password")
      return;
    }

    if (password === ""){
      toast.error("Please enter the new password")
      return;
    }



    if (comfpassword === ""){
      toast.error("Please enter the confirms password")
      return;
    }

    if (comfpassword.length < 6) {
      toast.error("password must be more than 6 character long")
      return;
    }

    if(comfpassword !== password ){
      toast.error("The password and confirmation password do not match")
      return
    }

    if (password === currpassword) {
      toast.error("Please enter different password")
    }else{
      await user.reauthenticateWithCredential(emailCred).then(()=>{
        toast.info("You have succesfully reset your password!")
        history.push("/post")
        return db.auth().currentUser.updatePassword(comfpassword);
      })
          .catch(error =>{
            toast.error("The old password is incorrect")
            console.log(error)
          })
    }

  }


  return (
      <div>
        <MuiThemeProvider>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img src={Reset} style={{width:"600px"}}/>
            </Grid>
            <Grid item xs={6} style={{marginTop:"200px"}}>
              <input type="password"
                     disableUnderline
                     className={classes.textfield}
                     onChange={currpassChange}
                     placeholder="Enter your old password"
              />
              <br/>
              <input type="password"
                     disableUnderline
                     className={classes.textfield}
                     onChange={passChange}
                     placeholder="Enter your new password"
              />
              <br/>
              <input
                  className={classes.textfield}
                  disableUnderline
                  onChange = {comfpassChange}
                  type="password"
                  placeholder="Confirm your new password"
              />
              <div>
                <Button style={{width:"30%", margin:"20px", backgroundColor:"#12897b", color:"white"}} className={classes.textfield} onClick={handleReset} >Reset</Button>
                <Button style={{width:"30%", margin:"20px"}} className={classes.textfield } onClick={()=>{history.goBack()}} >Cancel </Button>
              </div>

            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>

  )
}

const style = {width: "300px", margin:"0 auto"}
export default ResetPassword;