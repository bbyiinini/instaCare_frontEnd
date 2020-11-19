import React, {Component, useEffect, useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route ,useHistory, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import db,{firestore} from "./base";
import {useDispatch, useSelector,useStore} from "react-redux";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import NavHeader from "./components/nav/NavHeader";
import SignUpComplete from "./components/auth/SignUpComplete";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute"
import FinishSetUp from "./components/FinishSetUp";
import Request from "./components/request/RequestPlazza";
import RequestMangement from "./components/request/RequestMangement";
import PostRequest from "./components/request/PostRequest";
import Profile from './components/Profile'
import ResetPassword from "./components/auth/ResetPassword";

import userService from './service/UserService'
import Axios from "axios";


const App = () => {
  const dispatch = useDispatch();
  const [finishStatus,setStatus] = useState(true)
  let user = useSelector(state=>state.user)
  // console.log(user)
  if(user && user.uid){
    // check if user profile is completed
    firestore.collection("users").doc(user.uid).get().then((doc)=>{
      const data = doc.data()
      if(data.id==null){
        //  user hasn't finished setup
        setStatus(false)
        console.log("still false")
      }
    })
  }

  useEffect(async ()=>{
    const unsubscribe = db.auth().onAuthStateChanged(async (user) =>{
      if (user) {
        // persist user's loggin state
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type:'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
            displayName: user.displayName,
            uid: user.uid,
          }
        })

        // store user profile data into redux
        const {data} = await userService.retrieve(user.uid)
        const profileData = data.data
        dispatch({
          type:'SET_PROFILE',
          payload: profileData
        })

        const requestResult = await Axios.get(
            "http://localhost:8080/request/" + user.uid,
        );
        const requestDetail = requestResult.data.data
        dispatch({
          type: 'REQUEST',
          payload: requestDetail
        })

        const pastResult = await Axios.get(
            "http://localhost:8080/request/past/" + user.uid,
        );
        const pastRequestDetail = pastResult.data.data
        dispatch({
          type: 'PAST',
          payload: pastRequestDetail
        });

        const onGoingResult = await Axios.get(
            "http://localhost:8080/request/all",
        );
        const allOnGoingRequest = onGoingResult.data.data;
        dispatch({
          type: 'ALL_ONGOING_REQUEST',
          payload: allOnGoingRequest
        });

      }else{
        console.log("you have logout")
      }
    })
    // cleanup memory
    return () => unsubscribe();
  },[])



  return (

      <div className="App">
        <Router>
          <NavHeader/>
          <ToastContainer/>
          {/* <NavBar
            loggedIn={this.state.loggedIn}
            toggleLogin={this.toggleLogin}
          /> */}
          <Switch>
            <Route exact path="/">
              {!finishStatus && <Redirect to="/finishSetUp"/>}
              <div className="root">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Welcome {user==null?"":user.displayName}
                  </p>
                </header>
              </div>
            </Route>
            <ProtectedRoute exact path="/login" component={() => <Login />} />
            <ProtectedRoute exact path="/signup" component={() => <Signup />} />
            <Route exact path="/signup/complete" component={() => <SignUpComplete />} />
            <Route exact path="/forgot/resetpassword" component={() => <ForgotPassword />} />
            <Route exact path="/finishSetUp" component={() => <FinishSetUp/>}/>
            <Route exact path="/request" component={() => <Request />} />
            <Route exact path="/requestmangement" component={() => <RequestMangement />} />
            <Route exact path="/post" component={() => <PostRequest />} />
            <Route exact path="/profile" component={() => <Profile />} />
            <Route exact path="/reset" component={() => <ResetPassword />} />
          </Switch>
        </Router>
      </div>

    );

}

export default App;

