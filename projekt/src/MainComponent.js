import React, { Component } from 'react';
import Register from './Registration';
import Login from './Login';
import Game from './GameComponent';
import RegRedirect from './RegRedirectComponent';
import RegConfirm from './RegConfirmComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' component={() => <Login/>} />
	      <Route path='/register' component={() => <Register/>} />
          <Route path='/game' component={() => <Game/>} />
          <Route path='/redirect' component={() => <RegRedirect/>} />
          <Route path='/confirm' component={() => <RegConfirm/>} />
          <Redirect to='/register' />
        </Switch>
      </div>
    );
  }
}

export default Main;
