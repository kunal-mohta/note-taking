import React, { Component, ChangeEvent } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { NoteType } from 'src/types/index';

interface Props {
  visible: boolean,
  exitDialogFunc: () => void
  addNoteFunc: (newNoteData: NoteType, clearDialogData: () => void) => void,
  parentContext: any // TODO: find something for this
}

export default class AddNoteDialog extends Component<Props, { noteData: { title: string, content: string, [key: string]: string }, visible: boolean }> {
  constructor (props: Props) {
    super(props);

    this.state = {
      noteData: {
        title: '',
        content: ''
      },
      visible: this.props.visible
    }
  }

  handleInputChange (property: string, event: ChangeEvent) {
    let noteData = this.state.noteData;
    noteData[property] = (event.target as HTMLInputElement).value;
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