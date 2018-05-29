import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

const BASEURL = 'http://localhost:5000';

class App extends Component {
  render() {
    return (
      <Router>
        <div className = 'App'>
          <Route path = '/' component = { Dashboard } />
          <Route path = '/login' component = { LoginPage } />
          <Route path = '/signup' component = { SignUpPage } />
        </div>
      </Router>
    )
  }
}

class UsersPage extends Component {
  render() {
    return (
      <div className = 'App__usersPage'>
        <div className = 'App__usersPage__container'>
          <div className = 'App__usersPage__container__header'>Note Taking App</div>
          <div className = 'App__usersPage__container__body'>
            <div className = 'App__usersPage__container__body__main'>
              <div className = 'App__usersPage__container__body__main__form'>
                <div>{ this.props.title }</div>
                <form>
                  <div>
                    <label>Username</label>
                    <input type = 'text' value = { this.props.username } onChange = { this.props.handleInputChange.bind(this, 'username') }></input>
                  </div>
                  <div>
                    <label>Password</label>
                    <input type = 'password' value = { this.props.password } onChange = { this.props.handleInputChange.bind(this, 'password') }></input>
                  </div>
                  <div className = 'button' onClick = { this.props.compFunc }>{ this.props.title }</div>
                </form>
              </div>
            </div>
            <hr />
            <div className = 'App__usersPage__container__body__oauth'>
              <div className = 'App__usersPage__container__body__oauth__wrap'>
                { this.props.oauthMsg }
              </div>
            </div>
          </div>
          <div className = 'App__usersPage__container__footer'>
            <div className = 'App__usersPage__container__footer__signuplink'>{ this.props.footerMsg } 
            <Link to = { this.props.footerLink }> { this.props.footerLinkMsg }</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    }
  }

  handleInputChange(property, event) {
    let user = this.state.user;
    user[property] = event.target.value;
    this.setState({ user: user });
  }

  login() {
    fetch(
      BASEURL + '/users/login',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.user.username,
          password: this.state.user.password
        })
      }
    )
    .then(
      (response) => {
        console.log(response);
      }
    )
  }

  render() {
    return (
      <UsersPage title = 'Login' oauthMsg = 'If you have already linked your account, then sign in with the following' footerMsg = 'Don&apos;t have and account yet?' footerLink = '/signup' footerLinkMsg = 'Sign up here!' compFunc = { this.login } username = { this.state.user.username } password = { this.state.user.password } handleInputChange = { this.handleInputChange }/>
    )
  }
}

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    }
  }

  handleInputChange(property, event) {
    let user = this.state.user;
    user[property] = event.target.value;
    this.setState({ user: user });
  }

  signup() {
    fetch(
      BASEURL + '/users/signup',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.user.username,
          password: this.state.user.password
        })
      }
    )
    .then(
      (response) => {
        console.log(response);
      }
    );
  }

  render() {
    return (
      <UsersPage title = 'Sign Up' oauthMsg = 'You can also directly sign up via the following' footerMsg = 'Already have an account?' footerLink = '/login' footerLinkMsg = 'Login here!' compFunc = { this.signup } username = { this.state.user.username } password = { this.state.user.password } handleInputChange = { this.handleInputChange }/>
    )
  }
}

class Dashboard extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return {
      
    }
  }
}

export default App;
