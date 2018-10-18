import React, { Component } from 'react';
import Register from './Registration';
import Login from './Login'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/register' component={() => <Login/>} />
          <Redirect to='/register' />
        </Switch>
      </div>
    );
  }
}

export default Main;
