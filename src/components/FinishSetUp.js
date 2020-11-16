import React, {Component, useEffect, useState} from 'react';
import {useDispatch, useSelector,useStore} from "react-redux";
import {useHistory} from "react-router-dom"
import db,{firestore} from "../base";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {MailOutlined} from "@ant-design/icons";
import {Button} from "antd";

export default function FinishSetUp(props){
  let user = useSelector(state=>state.user)
  const {email, uid} = user
  let [fname,setfname] = useState("")
  let [lname,setlname] = useState("")
  let [phone,setphone] = useState("")
  let [addr,setaddr] = useState("")
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
  let history = useHistory()
  const handleFinish = async () => {
    const userObj = {
      firstName:fname,
      lastName:lname,
      fullName:fname+lname,
      email:email,
      id:uid,
      phone:phone,
      address:addr
    }
    await firestore.collection("users").doc(uid).set(userObj)
    window.location = "/"
  }


  return(<div>
    Finish Account Setup
    <MuiThemeProvider>
      <div>
        <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            onChange = {fnameChange}
        />
        <br/>
        <TextField
            hintText="Enter your Last Name"
            floatingLabelText="Last Name"
            onChange = {lnameChange}
        />
        <br/>
        <TextField
            hintText="Enter your Phone Number"
            floatingLabelText="Phone Number"
            onChange = {phoneChange}
        />
        <br/>
        <TextField
            hintText="Enter your Address"
            floatingLabelText="Address"
            onChange = {addrChange}
        />
        <br/>

      </div>
      <Button className="m-2" type="primary" shape="round" disabled={!finished} onClick={handleFinish}>Finish Setup</Button>
    </MuiThemeProvider>
  </div>)
}