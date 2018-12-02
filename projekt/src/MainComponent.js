import React, { Component } from 'react';
import Register from './Registration';
import Login from './Login';
import Game from './GameComponent';
import RegRedirect from './RegRedirectComponent';
import RegConfirm from './RegConfirmComponent';
import RegCheck from './RegCheckComponent';
import RegFail from './RegFailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// W RegCheck nie przekazujemy funkcji ze względu na parametry URL

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' component={() => <Login/>} />
	        <Route path='/register' component={() => <Register/>} />
          <Route path='/game' component={() => <Game/>} />
          <Route path='/redirect' component={() => <RegRedirect/>} />
          <Route path='/check/:name/:token' component={RegCheck} />
          <Route path='/confirm' component={() => <RegConfirm/>} />
          <Route path='/fail' component={() => <RegFail/>} />
          <Redirect to='/register' />
        </Switch>
      </div>
    );
  }
}

export default Main;
