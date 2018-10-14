import React, { Component } from 'react';
import Register from './Registration';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/register' component={() => <Register />} />
          <Redirect to='/register' />
        </Switch>
      </div>
    );
  }
}

export default Main;
