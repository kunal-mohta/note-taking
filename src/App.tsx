import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import { connect } from 'react-redux';

class App extends Component<{isLogin: boolean}> {
  render () {
    return (
      <Router>
        <div className = 'App'>
          <Switch>
            <PrivateRoute exact path = '/dashboard' component = { Dashboard } isLogin = {this.props.isLogin} />
            <Route path = '/login' component = { LoginPage } />
            <Route path = '/signup' component = { SignUpPage } />
            <Route path = '/' component = { DefaultLink } />
          </Switch>
        </div>
      </Router>
    )
  }
}

class PrivateRoute extends Component<{exact: boolean, path: string, component: typeof Dashboard, isLogin: boolean}, object> {
  render () {
    if (this.props.isLogin) return <Route path = { this.props.path } component = { this.props.component }/>
    else return <Redirect to = { {pathname: '/login'} } />
  }
}

class DefaultLink extends Component {
  render () {
    return <Redirect to = { {pathname: 'dashboard'} } />
  }
}

const mapStateToProps = (state: {loginReducer: {isLogin: boolean }}) =>({
  isLogin: state.loginReducer.isLogin
});

export default connect(mapStateToProps)(App);
