import React, { Component } from 'react';

export default class SignOutButton extends Component {
  render () {
    return (
      <div className = { this.props.class } title = 'Sign Out' onClick = { this.props.signOutFunc }>Sign Out</div>
    )
  }
}
