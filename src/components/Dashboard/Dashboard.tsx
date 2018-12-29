import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { setUsername, setNotes, addNote, addLabel, deleteLabel, deleteNote, addColor, updateBackend, SetUsernameAction } from '../../store/actions/actionCreators';
import { BASEURL } from '../../constants';

import SignOutButton from './SignOutButton';
import AddNoteButton from './AddNoteButton';
import Note from './Note';
import AddNoteDialog from './AddNoteDialog';
import { NoteType, StoreState, ThunkActionReturn } from 'src/types';
import { AddLabelAction, DeleteLabelAction, DeleteNoteAction, AddColorAction, SetNotesAction } from 'src/store/actions/creators/notes';
import { History } from 'history';

interface Props {
  // actions from redux
  addNote: (newNoteDate: NoteType) => ThunkActionReturn,
  updateBackend: () => ThunkActionReturn,
  addLabel: (noteIndex: number, label: string) => AddLabelAction,
  deleteLabel: (noteIndex: number, labelIndex: number) => DeleteLabelAction,
  deleteNote: (index: number) => DeleteNoteAction,
  addColor: (noteIndex: number, color: string) => AddColorAction,
  setUsername: (username: string) => SetUsernameAction,
  setNotes: (notes: NoteType[]) => SetNotesAction,

  // state as props from redux
  username: string,
  notes: NoteType[]

  // react router
  history: History,
}

class Dashboard extends Component<Props, { noteDialogVisibility: boolean, isHamOpen: boolean }> {
  constructor (props: Props) {
    super(props);

    console.log(this);

    this.state = {
      noteDialogVisibility: false,
      isHamOpen: false
    }

    this.openNoteDialog = this.openNoteDialog.bind(this);
    this.exitDialog = this.exitDialog.bind(this);
    this.openHam = this.openHam.bind(this);
    this.closeHam = this.closeHam.bind(this);
    this.addColorFunction = this.addColorFunction.bind(this);
    this.addLabelFunction = this.addLabelFunction.bind(this);
    this.deleteLabelFunction = this.deleteLabelFunction.bind(this);
    this.signOutFunction = this.signOutFunction.bind(this);

    //clicking anywhere outside note dialog should close the note dialog
    document.getElementsByTagName('body')[0].addEventListener('click', (e: MouseEvent) => {
      let isInsideDialog = ( (e.target as HTMLElement).parentElement!.className === 'App__dashboard__addNoteDialog' || (e.target as HTMLElement).className === 'App__dashboard__addNoteDialog' );

      if (isInsideDialog) { }
      else {
        this.exitDialog();
      }
    });

    window.onload = this.windowReload.bind(this);
  }

  openNoteDialog () {
    this.setState({ noteDialogVisibility: true });
  }

  exitDialog () {
    this.setState({ noteDialogVisibility: false });
  }

  openHam () {
    this.setState({ isHamOpen: true });
  }

  closeHam () {
    this.setState({ isHamOpen: false });
  }

  addNoteFunction (newNoteData: NoteType, clearDialogData: () => void) {
    this.props.addNote(newNoteData);
    this.props.updateBackend();
    clearDialogData();
    this.exitDialog();
  }

  addLabelFunction (closeLabelPage: () => void, noteIndex: number, label: string) {
    this.props.addLabel(noteIndex, label);
    this.props.updateBackend();
    closeLabelPage();
  }

  deleteLabelFunction (noteIndex: number, labelIndex: number) {
    this.props.deleteLabel(noteIndex, labelIndex);
    this.props.updateBackend();
  }

  // archiveNoteFunction (index) {
  // }

  deleteNoteFunction (index: number) {
    this.props.deleteNote(index);
    this.props.updateBackend();
  }

  addColorFunction (noteIndex: number, color: string) {
    this.props.addColor(noteIndex, color);
    this.props.updateBackend();
  }

  sortByFunction () {
    alert('Not available right now');
  }

  signOutFunction () {
    localStorage.setItem('jwt', 'false');
    this.props.history.push('/login');
  }

  updateState () {
    this.props.updateBackend();
  }

  windowReload () {
      if (localStorage.getItem('jwt') !== 'false') {
        fetch(
          BASEURL + '/userData/sessionLogin',
          {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              jwt: localStorage.getItem('jwt'),
            })
          }
        )
        .then(
          (response) => {
            switch (response.status) {
              case 200:
                response.json()
                .then(
                  (data) => {
                    this.props.setUsername(data.userData.username);
                    this.props.setNotes(data.userData.notes);
                  }
                );
                break;
              
              case 401:
                response.json()
                .then(
                  (data) => {
                    alert(data.message);
                    this.props.history.push('/login');
                  }
                );
                break;
              
              case 500:
                response.json()
                .then(
                  (data) => {
                    alert(data.message);
                    this.props.history.push('/login');
                  }
                );
                break;

              default: 
                alert('Unhandled error. Contact dev or try logging in again');
            }
          }
        )
        .catch (
          (e) => console.log(e)
        );
      }
      else {
        this.props.history.push('/login');
      }
  }
  
  render () {
    return (
      <div className = 'App__dashboard'>
        <div className = 'App__dashboard__header'>
          <div className = 'App__dashboard__header__title'>{ this.props.username }'s Notes</div>
          <SignOutButton class = 'App__dashboard__header__signOutButton' signOutFunc = { this.signOutFunction }/>
          <AddNoteButton onClickFunction = { this.openNoteDialog } class = 'App__dashboard__header__addNoteButton' />

          <div className = 'App__dashboard__header__hamburgericon' onClick = { this.openHam } style = { (this.state.isHamOpen) ? {display: 'none'} : {} }></div>
          <div className = 'App__dashboard__header__closeHamicon' onClick = { this.closeHam } style = { (this.state.isHamOpen) ? {} : {display: 'none'} }></div>
        </div>
        <div className = 'App__dashboard__maingrid'>
          <div className = 'App__dashboard__maingrid__sidebar'>
            <ul className = 'App__dashboard__maingrid__sidebar__options'>
              <li onClick = { this.sortByFunction }>Sort by
                <ul>

                </ul>
              </li>
              {/* <li>Archived Notes</li> */}
            </ul>
          </div>

          <div className = 'App__dashboard__maingrid__mainbody'>
            {
              this.props.notes.map(
                (note, index) => <Note key = { index } noteId = { index } title = { note.title } content = { note.content } color = { note.color } labels = { note.labels } addLabelFunc = { this.addLabelFunction } deleteNoteFunc = { this.deleteNoteFunction } addColorFunc = { (color) => { this.addColorFunction.call(null, index, color) } } deleteLabelFunc = { (labelIndex) => { this.deleteLabelFunction.call(null, index, labelIndex) } } parentContext = { this }/>
              )
            }
          </div>
        </div>

        <div className = 'App__dashboard__hamburger' style = { (this.state.isHamOpen) ? {left:'0vw'} : {left:'100vw'} }>
          <ul className = 'App__dashboard__hamburger__options'>
            <li onClick = { this.sortByFunction }>Sort By..</li>
            {/* <li>Archived Notes</li> */}
            <li onClick = { this.signOutFunction }>Sign Out</li>
          </ul>
        </div>

        <AddNoteDialog visible = { this.state.noteDialogVisibility } exitDialogFunc = { this.exitDialog } addNoteFunc = { this.addNoteFunction } parentContext = { this }/>
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => ({
  username: state.userReducer.username,
  notes: state.notesReducer.notes
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  setUsername,
  setNotes,
  addNote,
  deleteNote,
  addLabel,
  deleteLabel,
  addColor,
  updateBackend
},
dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);