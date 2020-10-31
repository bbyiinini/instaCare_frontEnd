import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import Login from './components/auth/Login.js'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import NavHeader from "./components/nav/NavHeader";
import SignUpComplete from "./components/auth/SignUpComplete";
import ForgotPassword from "./components/auth/ForgotPassword";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <div className="App">
      //   <Router>
      //     {/* <NavBar
      //       loggedIn={this.state.loggedIn}
      //       toggleLogin={this.toggleLogin}
      //     /> */}
      //     <Switch>
      //       <Route exact path="/">
      //         <div className="root">
      //           <header className="App-header">
      //             <img src={logo} className="App-logo" alt="logo" />
      //             <p>
      //               Edit <code>src/App.js</code> and save to reload.
      //             </p>
      //             <a href="/login">Login</a>
      //           </header>
      //         </div>
      //       </Route>
      //       <Route exact path="/login" component={() => <Login />} />
      //     </Switch>
      //   </Router>
      // </div>

        <div>
            <NavHeader />
            <ToastContainer/>
            <Switch>
            <Route exact path="/"  component={Home}/>
            <Route exact path="/login"  component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signup/complete" component={SignUpComplete}/>
            <Route exact path="/signup/forgot" component={ForgotPassword}/>
            </Switch>
        </div>
    );
  }
}

export default App;

