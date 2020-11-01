import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup'
import logo from './logo.svg';
import './App.css';
import NavHeader from "./components/nav/NavHeader";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavHeader/>
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
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a href="/login">Login</a>
                </header>
              </div>
            </Route>
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/signup" component={() => <Signup />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

