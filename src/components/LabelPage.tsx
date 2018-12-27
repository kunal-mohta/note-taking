import React, { Component, ChangeEvent } from 'react';

import NoteOptionPages from './NoteOptionPages';

interface Props {
  isOpen: boolean,
  closeFunc: () => void,
  addLabelFunc: (closeLabelPage: () => void, noteIndex: number, label: string) => void,
  noteId: number,
  color: string | undefined
}

export default class LabelPage extends Component<Props, { labelContent: string }> {
  constructor (props: Props) {
    super(props);

    this.state = {
      labelContent: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange (event: ChangeEvent) {
    this.setState({ labelContent: (event.target as HTMLInputElement).value });
  }

  render () {
    return (
      <NoteOptionPages isOpen = { this.props.isOpen } closeFunc = { this.props.closeFunc }>
        <div className = 'note__optionsPage__content__title'>
          What label do you want to add?
        </div>
        <input type = 'text' placeholder = 'Label Name' value = { this.state.labelContent } onChange = { this.handleInputChange } />
        {/* TODO: fix () => {} */}
        <div className = 'note__optionsPage__content__addButton' style = { {background:this.props.color} } onClick = { this.props.addLabelFunc.bind(null, () => {}, this.props.noteId, this.state.labelContent) } >Add</div>

      </NoteOptionPages>
    )
  }
}