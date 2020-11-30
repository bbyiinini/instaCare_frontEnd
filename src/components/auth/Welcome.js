import logo from "../../logo.svg";
import React, { useState, useEffect }  from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector,useStore} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Reset from "../../assets/Reset.png";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {firestore} from "../../base";


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
    textAlign:"center",
    height:"50px",
    marginBottom:"20px",
    width:"50%",
    margin:"20px",
    backgroundColor:"#12897b",
    color:"white"
  },
  imgstyle:{
    width:"100px",
    height:"100px",
    borderRadius:"50%",
    margin:"10px"
  }
});

export default function Welcome(){
  let history = useHistory()
  let classes = useStyles()
  let user = useSelector(state=>state.user)
  const [finishStatus,setStatus] = useState(0)

  if(user && user.uid){
    // check if user profile is completed
    firestore.collection("users").doc(user.uid).get().then((doc)=>{
      const data = doc.data()
      if(!data){
        //  user hasn't finished setup
        setStatus(1)
        console.log("still false")
      }else if(data.id==null){
        setStatus(1)
        console.log("still false")
      }else{
        setStatus(2)
      }
    })
  }

  if(user){
    if(finishStatus === 1){
      history.push("/finishSetUp")
    }else if(finishStatus === 2){
      history.push("/post")
    }
  }

  return(
      <div className="root">
        <MuiThemeProvider>
          <Grid container spacing={2}>
            <Grid style={{
              marginTop:"30vh"
            }}item xs={6}>
              <h2>Helps Drives Changes</h2>
              <h5>Match Volunteers with Senior</h5>
              <Button
                  onClick={()=>{
                    history.push("/signup")
                    console.log(history)
                  }}
                  className={classes.textfield} >Sign up</Button>
              <Button
                  onClick={()=>{
                    history.push("/login")
                    console.log(history)
                  }}
                  className={classes.textfield} >Login</Button>
            </Grid>
            <Grid item xs={6}>
              right
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
  )
}