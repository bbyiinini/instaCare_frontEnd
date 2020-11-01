import React, {Component, useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import db from "./base";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import {userReducer} from "./reducer/UserReducer";
import Login from './components/Login'
import Signup from './components/Signup'
import NavHeader from "./components/nav/NavHeader";
import SignUpComplete from "./components/SignUpComplete";
import ForgotPassword from "./components/ForgotPassword";



const App = () => {
  const dispatch = useDispatch();
  let {user} = useSelector((state)=>({...state}))
  // console.log(user)
  useEffect(()=>{
    const unsubscribe = db.auth().onAuthStateChanged(async (user) =>{
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user)
        dispatch({
          type:'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
            displayName: user.displayName
          }
        })
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
              <div className="root">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Welcome {user.displayName}
                  </p>
                </header>
              </div>
            </Route>
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/signup" component={() => <Signup />} />
            <Route exact path="/signup/complete" component={() => <SignUpComplete />} />
            <Route exact path="/forgot/resetpassword" component={() => <ForgotPassword />} />
          </Switch>
        </Router>
      </div>

    );

}

export default App;

