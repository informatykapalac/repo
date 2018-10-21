import React, { Component } from 'react';
import Register from './Registration';
import Login from './Login';
import Game from './GameComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/login' component={() => <Login/>} />
	        <Route path='/register' component={() => <Register/>} />
          <Route path='/game' component={() => <Game/>} />
          <Redirect to='/register' />
        </Switch>
      </div>
    );
  }
}

export default Main;
