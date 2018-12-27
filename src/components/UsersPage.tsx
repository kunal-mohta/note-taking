import React, { Component, ChangeEvent } from 'react';

import { Link } from 'react-router-dom';

interface Props {
  title: string,
  oauthMsg: string,
  footerMsg: string,
  footerLink: string,
  footerLinkMsg: string,
  compFunc: () => void,
  username: string,
  password: string,
  handleInputChange: (property: string, event: ChangeEvent) => void,
  errMsg: string
}

export default class UsersPage extends Component<Props> {
  render () {
    return (
      <div className = 'App__usersPage'>
        <div className = 'App__usersPage__container'>
          <div className = 'App__usersPage__container__header'>Note Taking App</div>
          <div className = 'App__usersPage__container__body'>
            <div className = 'App__usersPage__container__body__main'>
              <div className = 'App__usersPage__container__body__main__form'>
                <div className = 'title'>{ this.props.title }</div>
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
                  <div className = 'errMsg'>{ this.props.errMsg }</div>
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