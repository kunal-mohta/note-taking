import React, { Component } from 'react';

interface Props {
  closeFunc: () => void,
  isOpen: boolean
}

export default class NoteOptionPages extends Component<Props, { openStyle: { display: string }, closeStyle: { display: string }}> {
  constructor (props: Props) {
    super(props);
    this.state = {
      openStyle: { display: 'block' },
      closeStyle: { display: 'none' }
    }
  }

  render () {
    return (
      <div className = 'note__optionsPage' style = { (this.props.isOpen) ? this.state.openStyle : this.state.closeStyle } >
        <div className = 'note__optionsPage__close' onClick = { this.props.closeFunc }></div>
        <div className = 'note__optionsPage__content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}