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
import NavBar from "./components/nav/NavBar";
import SignUpComplete from "./components/auth/SignUpComplete";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute"
import FinishSetUp from "./components/FinishSetUp";
import Request from "./components/request/RequestPlaza";
import RequestMangement from "./components/request/RequestMangement";
import PostRequest from "./components/request/PostRequest";
import Profile from './components/Profile'
import ResetPassword from "./components/auth/ResetPassword";
import Welcome from './components/auth/Welcome'
import userService from './service/UserService'
import Axios from "axios";
import AddressService from "./service/AddressService";
// import NavBar from "./components/nav/NavBar";


const App = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [finishStatus,setStatus] = useState("unkown")
  let user = useSelector(state=>state.user)
  if(!user){user = {UnLogin:true}}
  // console.log(user)
  if(user && user.uid){
    // check if user profile is completed
    firestore.collection("users").doc(user.uid).get().then((doc)=>{
      const data = doc.data()
      if(!data){
        //  user hasn't finished setup
        setStatus(false)
        console.log("still false")
      }else if(data.id==null){
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

        if (profileData !== null) {
          let userType = profileData.userType;
          const requestResult = await Axios.get(
              "http://localhost:8080/request/" + user.uid, {params: {userType:userType}}
          );
          const requestDetail = requestResult.data.data
          dispatch({
            type: 'REQUEST',
            payload: requestDetail
          })
        }
        const addressResult = await AddressService.getAddressByUid(user.uid);
        const addressDetail = addressResult.data.data;
        dispatch({
          type: 'SET_ADDRESS',
          payload: addressDetail
        })


        const pastResult = await Axios.get(
            "http://localhost:8080/request/past/" + user.uid
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

        let address = [];
        if (allOnGoingRequest.length !== 0) {
          allOnGoingRequest.map(async (res, index) => {
            await AddressService.getAddressByAddressId(res.seniorId, res.addressID).then(res=>{
              const addressDetail = res.data.data;
              let result = null;
              if (addressDetail){
                result = addressDetail.streetAddressL2 === "" ? addressDetail.streetAddressL1 + ", " + addressDetail.city + ", " +
                    addressDetail.state + " " + addressDetail.zipCode :
                    addressDetail.streetAddressL1 + ", " + addressDetail.streetAddressL2 + ", " + addressDetail.city + ", " +
                    addressDetail.state + " " + addressDetail.zipCode;
                address = [...address, {addr:result, id: index}]
              }else{
                address = [...address, {addr: "", id: index}]
              }
              if ((address.length === allOnGoingRequest.length)){
                dispatch({
                  type:'ADD_ADDRESS_LIST',
                  payload: address
                })
              }
            })
          })
        }else{
          dispatch({
            type:'ADD_ADDRESS_LIST',
            payload: address
          })
        }

        if (pastRequestDetail.length !== 0){
            let temp = null;
            let result = [];

            for (let i = 0; i < pastRequestDetail.length; i++) {
              userService.retrieve(profileData.userType===0?pastRequestDetail[i].volunteerId:pastRequestDetail[i].seniorId).then(res=>{
                temp = res.data.data
                result = [...result, temp]
                if (i === pastRequestDetail.length - 1){
                  dispatch({
                    type: 'RATING',
                    payload: result
                  })
                }
             }).catch(error=>console.log(error.message))

            }
          }else{
          dispatch({
            type: 'RATING',
            payload: []
          })
        }

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
          {/* <NavHeader/> */}
          <NavBar/>
          <ToastContainer/>
          {/* <NavBar
            loggedIn={this.state.loggedIn}
            toggleLogin={this.toggleLogin}
          /> */}
          <Switch>
            <Route exact path="/">
              <Welcome/>
              {/*{(!user && !finishStatus)? <div></div> : (user.UnLogin === true ? <Welcome/> : <Redirect to="/post"/>)}*/}
              {!finishStatus && <Redirect to="/finishSetUp"/>}
              {/*{finishStatus === 'unknown' ? <div></div> : (user.UnLogin === true ? <Welcome/> : <Redirect to="/post"/>)}*/}
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

