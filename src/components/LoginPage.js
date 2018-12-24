import React, { Component } from 'react';

import UsersPage from './UsersPage';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loginTrue, setUsername, setNotes } from '../store/actions/actionCreators';

const BASEURL = '';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      user: {
        username: '',
        password: ''
      },
      errMsg: ''
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
        switch (response.status) {
          case 200:
            //Successful Login
            response.json()
            .then(
              (data) => {
                localStorage.setItem('jwt', data.jwt);
                this.props.loginTrue();
                // this.props.setActiveUserData(data.userData);
                this.props.setUsername(data.userData.username);
                this.props.setNotes(data.userData.notes);
                this.props.history.push('/dashboard');
              }
            );
            break;

          case 403: 
            //Wrong username/password
            response.json()
            .then(
              (data) => {
                console.log(data.message);
                this.setState({ errMsg: data.message });
              }
            );
            break;

          case 500:
            //Internal Server Error
            response.json()
            .then(
              (data) => {
                console.log(data.message);
                this.setState({ errMsg: data.message });
              }
            );
            break;

          default: 
            alert('Unhandled erro. Contact dev or login again');
        }
      }
    )
    .catch (
      (error) => {
        alert(error);
      }
    )
  }

  render() {
    return (
      <UsersPage title = 'Login' oauthMsg = 'If you have already linked your account, then sign in with the following' footerMsg = 'Don&apos;t have and account yet?' footerLink = '/signup' footerLinkMsg = 'Sign up here!' compFunc = { this.login } username = { this.state.user.username } password = { this.state.user.password } handleInputChange = { this.handleInputChange } errMsg = { this.state.errMsg }/>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loginTrue,
  setUsername,
  setNotes
},
dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);