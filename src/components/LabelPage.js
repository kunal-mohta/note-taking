import React, { Component } from 'react';

import NoteOptionPages from './NoteOptionPages';

export default class LabelPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      labelContent: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange (event) {
    this.setState({ labelContent: event.target.value });
  }

  render () {
    return (
      <NoteOptionPages isOpen = { this.props.isOpen } closeFunc = { this.props.closeFunc }>
        <div className = 'note__optionsPage__content__title'>
          What label do you want to add?
        </div>
        <input type = 'text' placeholder = 'Label Name' value = { this.state.labelContent } onChange = { this.handleInputChange } />
        <div className = 'note__optionsPage__content__addButton' style = { {background:this.props.color} } onClick = { this.props.addLabelFunc.bind(null, this.props.noteId, this.state.labelContent) } >Add</div>

      </NoteOptionPages>
    )
  }
}