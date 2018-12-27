import { LOGIN_TRUE, SET_USERNAME } from './actionTypes';
import { BASEURL } from '../../constants';

// notes actions
import { setNotes, addNote, deleteNote, addLabel, deleteLabel, addColor } from './creators/notes';
import { Dispatch } from 'redux';
import { StoreState } from 'src/types';
export { setNotes, addNote, deleteNote, addLabel, deleteLabel, addColor };

export interface LoginTrueAction {
  type: LOGIN_TRUE
}

export const loginTrue = (): LoginTrueAction => ({ type: LOGIN_TRUE })


export interface SetUsernameAction {
  type: SET_USERNAME,
  username: string
}

export const setUsername = (username: string) => ({ type: SET_USERNAME, username });

export const updateBackend = () => {
  return (dispatch: Dispatch, getState: () => StoreState) => {
    fetch(
      BASEURL + '/userData/update',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jwt: localStorage.getItem('jwt'),
          userData: {
            username: getState().userReducer.username,
            notes: getState().notesReducer.notes
          }
        })
      }
    )
    .then(
      (response) => {
        switch (response.status) {
          case 200:
            break;

          case 401:
            response.json()
            .then(
              (data) => {
                alert(data.message);
              }
            )
            break;
          
          case 500:
            response.json()
            .then(
              (data) => {
                alert(data.message);
              }
            )
            break;

          default:
            alert('Undhandled error. Contact dev or please try logging in again');
        }
      }
    );
  }
}
