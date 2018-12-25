import { LOGIN_TRUE, ADD_NOTE, ADD_LABEL, DELETE_LABEL, DELETE_NOTE, ADD_COLOR, SET_NOTES, SET_USERNAME } from './actionTypes';
import { BASEURL } from '../../constants';

export const loginTrue = () => ({ type: LOGIN_TRUE })
// export const setActiveUserData = (newData) => ({ type: SET_ACTIVE_USER_DATA, newData })
export const setUsername = (username) => ({ type: SET_USERNAME, username });
export const setNotes = (notes) => ({ type: SET_NOTES, notes });
export const addNote = (newNote) => ({ type: ADD_NOTE, newNote });
export const deleteNote = (index) => ({ type: DELETE_NOTE, index});
export const addLabel = (noteIndex, label) => ({ type: ADD_LABEL, noteIndex, label});
export const deleteLabel = (noteIndex, labelIndex) => ({ type: DELETE_LABEL, noteIndex, labelIndex });
export const addColor = (noteIndex, color) => ({ type: ADD_COLOR, noteIndex, color});

export const updateBackend = () => {
  return (dispatch, getState) => {
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
            // this.setState({
            //   data: {
            //     username: this.props.username,
            //     notes: this.props.notes
            //   }
            // });
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
