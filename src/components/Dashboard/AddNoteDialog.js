import React, { Component } from 'react';

export default class AddNoteDialog extends Component {
  constructor (props) {
    super(props);

    this.state = {
      noteData: {
        title: '',
        content: ''
      },
      visible: this.props.visible
    }
  }

  handleInputChange (property, event) {
    let noteData = this.state.noteData;
    noteData[property] = event.target.value;
    this.setState({ noteData: noteData });
  }

  clearDialogData () {
    this.setState({ 
      noteData: {
        title: '',
        content: ''
      }
    });
  }

  render () {
    return (
      <div className = 'App__dashboard__addNoteDialog' style = { (this.props.visible) ? {display:'grid'} : {display:'none'} } >
        <input type = 'text' placeholder = 'Note Title' value = { this.state.noteData.title } onChange = { this.handleInputChange.bind(this, 'title') } />
        <textarea placeholder = 'Note Content' value = { this.state.noteData.content } onChange = { this.handleInputChange.bind(this, 'content') }></textarea>
        <div className = 'App__dashboard__addNoteDialog__close' onClick = { this.props.exitDialogFunc }></div>
        <div className = 'App__dashboard__addNoteDialog__button' onClick = { this.props.addNoteFunc.bind(this.props.parentContext, this.state.noteData, this.clearDialogData.bind(this)) }>Add Note</div>
      </div>
    )
  }
}