import React, { Component } from 'react';

export default class AddNoteButton extends Component {
  render () {
    return (
      <div className = { this.props.class } title = 'Add Note' onClick = { this.props.onClickFunction }></div>
    )
  }
}