import { LOGIN_TRUE, SET_USERNAME } from './actionTypes';
import { BASEURL } from '../../constants';

// notes actions
import { setNotes, addNote, deleteNote, addLabel, deleteLabel, addColor } from './creators/notes';
export { setNotes, addNote, deleteNote, addLabel, deleteLabel, addColor };

export const loginTrue = () => ({ type: LOGIN_TRUE })
// export const setActiveUserData = (newData) => ({ type: SET_ACTIVE_USER_DATA, newData })
export const setUsername = (username) => ({ type: SET_USERNAME, username });

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
