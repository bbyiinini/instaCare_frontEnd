import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector,useStore} from "react-redux";
import {useHistory} from "react-router-dom"
import db,{firestore} from "../base";
import UserService from "../service/UserService";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import senior from '../assets/senior.jpeg'
import volunteer from '../assets/volunteer.png'
import googlePNG from '../assets/google.png'
import welcome from '../assets/welcome.png'
import main from '../assets/main.svg'
import TextField from 'material-ui/TextField';
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
    textAlign:"center"
  },
  imgstyle:{
    width:"100px",
    height:"100px",
    borderRadius:"50%",
    margin:"10px"
  }
});

export default function FinishSetUp(props){
  const classes = useStyles()
  let user = useSelector(state=>state.user)
  // let user = db.auth().currentUser
  console.log(user)
  const {email, uid} = user
  let [fname,setfname] = useState("")
  let [lname,setlname] = useState("")
  let [phone,setphone] = useState("")
  let [addr,setaddr] = useState("")

  const [seniorBorder, setSenior] = useState("");
  const [volunteerBorder, setVolunteer] = useState("");
  const [type, setType] = useState(0);

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

  const fnameChange = (e) => {
    setfname(e.target.value);
  };
  const lnameChange = (e) => {
    setlname(e.target.value);
  };
  const phoneChange = (e) => {
    setphone(e.target.value);
  };
  const addrChange = (e) => {
    setaddr(e.target.value);
  };
  let finished = fname && lname && phone && addr;
  const handleFinish = async () => {
    const userObj = {
      firstName:fname,
      lastName:lname,
      fullName:fname +" "+ lname,
      email:email,
      id:uid,
      phone:phone,
      avatar:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
      addressList:[addr],
      userType:type
    }


    await UserService.registed(uid, userObj).then(res=>{
      console.log("saved user type to backend")
    }).catch(res=>{
      console.log("CORS not connected")
    });
    window.location = "/"
  }


  return(
      <div>
    <MuiThemeProvider>
      <Grid container spacing={0} style={{marginTop:"100px"}}>
        <Grid item xs={6}>
          <h3>We Want to Know More About You ...</h3>
          <img src={main} style={{width:"600px"}}/>
        </Grid>
        <Grid item xs={6}>
          <div style={{lineHeight:"100%"}}>
            <div style={{display:"inline-block",lineHeight:"3.5",fontSize:"32px"}}>I am a:</div>
            <div
                style={{
                  verticalAlign: "top",
                  display: "inline-block",
                  textAlign: "center",
                  width: "120px"
                }}>
              <img
                  style={{border:seniorBorder}}
                  className={classes.imgstyle}
                  onClick={() => typeChange(0)}
                  src={senior}
                  alt={"senior"}/>

              <span style={{
                display:"block"
              }}>Senior</span>
            </div>
            <div
                style={{
                  verticalAlign: "top",
                  display: "inline-block",
                  textAlign: "center",
                  width: "120px"
                }}
            >
              <img
                  value={1}
                  onClick={() => typeChange(1)}
                  style={{border:volunteerBorder}}
                  className={classes.imgstyle} src={volunteer} alt={"volunteer"}/>
              <span style={{
                display:"block"
              }}>Volunteer</span>
            </div>
          </div>
          <div>
            <div className={classes.textfield}>
              <Input
                  disableUnderline
                  style={{width:"80%"}}
                  placeholder={"First Name"}
                  onChange = {fnameChange}
              />
            </div>
            <br/>
            <div className={classes.textfield}>
              <Input
                  disableUnderline
                  style={{width:"80%"}}
                  placeholder={"Last Name"}
                  onChange = {lnameChange}
              />
            </div>
            <br/>
            <div className={classes.textfield}>
              <Input
                  disableUnderline
                  style={{width:"80%"}}
                  placeholder={"Phone Number"}
                  onChange = {phoneChange}
              />
            </div>
            <br/>
            <div className={classes.textfield}>
              <Input
                  disableUnderline
                  style={{width:"80%"}}
                  placeholder={"Address"}
                  onChange = {addrChange}
              />
            </div>
            <br/>
            <Button label="Complete Info"
                    style={{backgroundColor:"#12897b", color:"white"}}
                    className={classes.textfield}
                    onClick={handleFinish}>Complete Finish</Button>
          </div>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  </div>)
}