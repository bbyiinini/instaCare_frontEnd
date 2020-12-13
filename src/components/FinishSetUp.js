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
import {toast} from "react-toastify";
import ReactPhoneInput from "react-phone-input-2";

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
  const {email, uid} = user
  let [fname,setfname] = useState("")
  let [lname,setlname] = useState("")
  let [phone,setphone] = useState("")
  let [addr,setaddr] = useState("")

  const [seniorBorder, setSenior] = useState("");
  const [volunteerBorder, setVolunteer] = useState("");
  const [type, setType] = useState(-1);

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
  let finished = fname && lname && phone && (type !== -1);
  const handleFinish = async () => {
    if(!finished){
      toast.error("please enter all information!")
      return
    }
    let phonere = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if(!phonere.test(phone)){
      toast.error("please enter a 11 digit phone number!")
      return
    }
    let avt = type === 0 ? "https://s3-alpha-sig.figma.com/img/84c2/1c42/c9125fdec92ca5e62e6c1c10f93b8572?Expires=1607904000&Signature=As5sq50TYgxaL4ToxpGZt~Nv70c0x-UEQpGC0AyoAPJ4fl1tmswCsIlCyzyIU~K7rzdIzw9L5NKs5pPwW2yPQMWxEN4PYOntvdjxA73m6BrjRMgisqTS~alClYZI~AGNfisRhqamZU2DiJ1SQ1LmvSjQvcBLIad49wY3-KjATJukzG46GTClY4XUReFidoRmJ4cpUBo-hjyHkq3ZFxEwYl-1qsNTYXnpZZ1qrtNrf4tTQO6~iV2x6te844DYyt2lkAqnFZ4hGSFlK9qFHeMueh3goLIsquXXltXzAfaHkarNIvAyL55RtClgDStlfK-wX8u8GN3HMuhHJOL-uf2XVQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" : "https://s3-alpha-sig.figma.com/img/f585/f8c0/117253c43893dfc0f6afbddd4664d411?Expires=1607904000&Signature=ZJmjUGVWqgXKoV6ZbedzgD~0igUPNyxdWjqOpP~pvIx4x7IUShUmio1WGhtQOa2mcBPdNmeolawo4vXoFoD8xItQZIcwjD67geN-F8SFpEQt54V-4S4rNrleqM37uu54DnIi12bJsOMf2svpyWLDdjVbnlT31NkDzMrVhnmEDKPtYJYoRI~hzWRbd~MalGdgcJcUfFv69YOpHhC36GJtj9TIsbE8cayxy7VTWK2BxBELKGSB9ms8bs5B08y~NO24LYBwrBwW-QXiXAJYaq0X0HFm8vGOKgEX9BBemOOGHarGqI92VzmzVhPwy8n87yluvCnJGwoGkDQnJb~EL~KMRA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
    const userObj = {
      firstName:fname,
      lastName:lname,
      fullName:fname +" "+ lname,
      email:email,
      id:uid,
      phone:phone,
      avatar:avt,
      addressList:[],
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
      <div style={{overflow:'hidden'}}>
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
              <div
                  style={{border:seniorBorder}}
                  className={classes.imgstyle}
              >
              <img
                  style={{width:"90px",marginTop:"18px",borderRadius:"50px"}}
                  onClick={() => typeChange(0)}
                  src={senior}
                  alt={"senior"}/></div>

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
              <div
                  style={{border:volunteerBorder}}
                  className={classes.imgstyle} src={volunteer} alt={"volunteer"}
              >
              <img
                  value={1}
                  onClick={() => typeChange(1)}
                  src={"https://s3-alpha-sig.figma.com/img/3c33/8418/0492a571e5731b85f37ca208f9534a54?Expires=1607904000&Signature=DIVB9B4iGYGUib7daL7sz5lc4JUQjq4HRuff63suQ4uYdtobBKBNi~X0VT-kGAy4MAAh1jOGzBDWV7ZTQ4ooqade0QudqI-~~XtSUrnvzvzsUzfdglUOo0-RqSPqrJO2QPbQmAnSBiKeW2Nl~uFZ6QdjgHhQeAcRQyk4s5ToR1tNfbpbmVdh9u-4gKe88v8awa-fIy3NyJweS5f1Y0RNiqd3IyLuKu-UexD6rA5BvyJS5Q0ynd2bJsQAwNo7Osd-K2VR2mIvgpXMvGU9euGwE1YSXQBcAeBdckOStJ40ChSqr53fVvE9-gOGVXdf9F-QwbpnR5iZBN~CzpogXVapAA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"}
                  style={{width:"90px",marginTop:"18px",borderRadius:"50px"}}/>
              </div>
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
            {/*<ReactPhoneInput*/}
            {/*      style={{width:"30%",margin:'auto'}}*/}
            {/*      country={'us'}*/}
            {/*      onlyCountries={['us']}*/}
            {/*      isValid={(value, country) => {*/}
            {/*        if (!value.match(/1/)) {*/}
            {/*          return 'Invalid area code: ' + value + ', ' + country.name;*/}
            {/*        } else {*/}
            {/*          return true;*/}
            {/*        }*/}
            {/*      }}*/}
            {/*      inputProps={{*/}
            {/*        name: "phone",*/}
            {/*        required: true,*/}
            {/*      }}*/}
            {/*      onChange={e => {setphone(e)}}*/}
            {/*  />*/}
            <br/>
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