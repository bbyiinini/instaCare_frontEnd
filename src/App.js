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

import {userReducer} from "./reducer/UserReducer";
import Login from './components/Login'
import Signup from './components/Signup'
import NavHeader from "./components/nav/NavHeader";
import SignUpComplete from "./components/SignUpComplete";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute"
import FinishSetUp from "./components/FinishSetUp";


const App = () => {
  const dispatch = useDispatch();
  const [finishStatus,setStatus] = useState(true)
  let user = useSelector(state=>state.user)
  console.log(user)
  if(user && user.uid){
    // check if user profile is completed
    firestore.collection("users").doc(user.uid).get().then((doc)=>{
      const data = doc.data()
      if(!data){
        //  user hasn't finished setup
        setStatus(false)
        console.log("still false")
      }
    })
  }

  useEffect(async ()=>{
    const unsubscribe = db.auth().onAuthStateChanged(async (user) =>{
      if (user) {
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
            <Route exact path="/signup" component={() => <Signup />} />
            <Route exact path="/signup/complete" component={() => <SignUpComplete />} />
            <Route exact path="/forgot/resetpassword" component={() => <ForgotPassword />} />
            <Route exact path="/finishSetUp" component={() => <FinishSetUp/>}/>
          </Switch>
        </Router>
      </div>

    );

}

export default App;

