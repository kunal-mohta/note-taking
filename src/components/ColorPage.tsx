import React, { Component } from 'react';

import NoteOptionPages from './NoteOptionPages';

interface Props {
  closeFunc: () => void,
  addColorFunc: (color: string) => void,
  color: string | undefined,
  isOpen: boolean
}

export default class ColorPage extends Component<Props, { colors: string[], selectedColorIndex: number }> {
  constructor (props: Props) {
    super(props);
    
    this.state = {
      colors: ['#5628b4', '#d80e70', '#f7b236', '#0f3057', '#ff561e', '#2a9c6e', '#8d1c40', '#e7455f', '#e43a19'],
      selectedColorIndex: -1
    }
  }

  componentDidMount () {
    this.setState({ selectedColorIndex: this.state.colors.indexOf(this.props.color!) });
  }

  selectColor (color: string, index: number) {
    this.props.addColorFunc.bind(null, color)();

    this.setState({ selectedColorIndex: index });
  }

  render () {
    return (
      <NoteOptionPages isOpen = { this.props.isOpen } closeFunc = { this.props.closeFunc }>
        <div className = 'note__optionsPage__content__title'>
          Choose Note Color
        </div>
        <div className = 'note__optionsPage__content__colorPalette'>
          {
            this.state.colors.map(
              (color, index) => {
                if (index === this.state.selectedColorIndex) {
                  return (
                    <div key = { index } style = { {background: color, border: 'solid black 5px'} } className = 'note__optionsPage__content__colorPalette__color' onClick = { this.props.addColorFunc.bind(null, color) }>
                    </div>
                  );
                }
                else {
                  return (
                    <div key = { index } style = { {background: color} } className = 'note__optionsPage__content__colorPalette__color' onClick = { this.selectColor.bind(this, color, index) }>
                    </div>
                  );
                }
              }
              
            )
          }
        </div>
      </NoteOptionPages>
    )
  }
}