import React, { Component } from 'react';

import LabelPage from '../LabelPage';
import ColorPage from '../ColorPage';

export default class Note extends Component<{}, {isLabelPage: boolean, isColorPage: boolean }> {
  constructor (props) {
    super(props);

    this.state = {
      isLabelPage: false,
      isColorPage: false
    }

    this.openLabelPage = this.openLabelPage.bind(this);
    this.closeLabelPage = this.closeLabelPage.bind(this);
    this.openColorPage = this.openColorPage.bind(this);
    this.closeColorPage = this.closeColorPage.bind(this);
  }

  openLabelPage () {
    this.setState({ isLabelPage: true });
  }

  closeLabelPage () {
    this.setState({ isLabelPage: false });
  }

  openColorPage () {
    this.setState({ isColorPage: true });
  }

  closeColorPage () {
    this.setState({ isColorPage: false });
  }

  render () {
    return (
      <div className = 'note'>
        <div className = 'note__colorBar' style = { {background: this.props.color} }></div>
        <div className = 'note__title'>{ this.props.title }</div>
        <div className = 'note__body'>{ this.props.content }</div>
        <div className = 'note__labelSection'>
          {
            this.props.labels.map(
              (label, index) => <div key = { index } className = 'note__labelSection__label' style = { {background: this.props.color} } title = 'Remove Label' onClick = { this.props.deleteLabelFunc.bind(null, index) }>{ label }</div>
            )
          }
        </div>
        <div className = 'note__operations'>
          <div className = 'note__operations__addLabel' onClick = { this.openLabelPage } style = { {background: this.props.color} }>Add Label</div>
          
          <div className = 'note__operations__palette' title = 'Change Note Color' onClick = { this.openColorPage }></div>
          {/* <div className = 'note__operations__archive' title = 'Archive Note' onClick = { this.props.archiveNoteFunc.bind(this.props.parentContext, this.props.noteId) }></div> */}
          <div className = 'note__operations__delete' title = 'Delete Note' onClick = { this.props.deleteNoteFunc.bind(this.props.parentContext, this.props.noteId) }></div>
        </div>

        <LabelPage isOpen = { this.state.isLabelPage } closeFunc = { this.closeLabelPage } addLabelFunc = { this.props.addLabelFunc.bind(null, this.closeLabelPage) } noteId = { this.props.noteId } color = { this.props.color }/>
        <ColorPage isOpen = { this.state.isColorPage } closeFunc = { this.closeColorPage } addColorFunc = { this.props.addColorFunc } color = { this.props.color }/>
      </div>
    );
  }
}
