import React, { Component } from 'react';

export default class AddNoteButton extends Component<{class: string, onClickFunction: () => void}> {
  render () {
    return (
      <div className = { this.props.class } title = 'Add Note' onClick = { this.props.onClickFunction }></div>
    )
  }
}