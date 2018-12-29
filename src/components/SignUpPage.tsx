import React, { Component, ChangeEvent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import UsersPage from './UsersPage';

import { loginTrue, setUsername, setNotes, LoginTrueAction, SetUsernameAction } from '../store/actions/actionCreators';
import { SetNotesAction } from 'src/store/actions/creators/notes';
import { NoteType } from 'src/types';
import { History } from 'history';
import { BASEURL } from 'src/constants';

interface Props {
  loginTrue: () => LoginTrueAction,
  setUsername: (username: string) => SetUsernameAction,
  setNotes: (notes: NoteType[]) => SetNotesAction,
  history: History
}

class SignUpPage extends Component<Props, { user: { username: string, password: string, [key: string]: string }, errMsg: string }> {
  constructor(props: Props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      user: {
        username: '',
        password: ''
      },
      errMsg: ''
    }
  }

  handleInputChange(property: string, event: ChangeEvent) {
    let user = this.state.user;
    user[property] = (event.target as HTMLInputElement).value;
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
        switch (response.status) {
          case 200:
            //Successful Signup
            response.json()
            .then(
              (data) => {
                localStorage.setItem('jwt', data.jwt);
                this.props.loginTrue();
                // this.props.setActiveUserData({
                //   username: this.state.user.username,
                //   notes: []
                // });
                this.props.setUsername(this.state.user.username);
                this.props.setNotes([]);
                this.props.history.push('/dashboard');
              }
            );
            break;

          case 409: 
            //User already exists
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
                this.setState({ errMsg: data.message }) ;
              }
            );
            break;

          default:
        } 
      }
    );
  }

  render() {
    return (
      <UsersPage title = 'Sign Up' oauthMsg = 'You can also directly sign up via the following' footerMsg = 'Already have an account?' footerLink = '/login' footerLinkMsg = 'Login here!' compFunc = { this.signup } username = { this.state.user.username } password = { this.state.user.password } handleInputChange = { this.handleInputChange } errMsg = { this.state.errMsg }/>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  loginTrue,
  setUsername,
  setNotes
},
dispatch);

export default connect(null, mapDispatchToProps)(SignUpPage);