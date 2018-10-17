import React, { Component } from 'react';
import Login from './Login';
import Register from './Registration';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' component={() => <Login/>} />
          <Redirect to='/login' />
        </Switch>
      </div>
    );
  }
}

export default Main;
