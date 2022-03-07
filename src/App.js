import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './containers/Home';
import { SignIn } from './containers/signin';
import { SignUP } from './containers/signup';

  export class App extends Component {
    render() {
      return (
        <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUP} />
          </Switch>
        </Router>
      </div>
      );
    }
  }
  
  export default App;
  