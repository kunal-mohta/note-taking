import { LOGIN_TRUE, ADD_NOTE, ADD_LABEL, DELETE_LABEL, DELETE_NOTE, ADD_COLOR, SET_NOTES, SET_USERNAME } from './actionTypes';

export const loginTrue = () => ({ type: LOGIN_TRUE })
// export const setActiveUserData = (newData) => ({ type: SET_ACTIVE_USER_DATA, newData })
export const setUsername = (username) => ({ type: SET_USERNAME, username });
export const setNotes = (notes) => ({ type: SET_NOTES, notes });
export const addNote = (newNote) => ({ type: ADD_NOTE, newNote });
export const deleteNote = (index) => ({ type: DELETE_NOTE, index});
export const addLabel = (noteIndex, label) => ({ type: ADD_LABEL, noteIndex, label});
export const deleteLabel = (noteIndex, labelIndex) => ({ type: DELETE_LABEL, noteIndex, labelIndex });
export const addColor = (noteIndex, color) => ({ type: ADD_COLOR, noteIndex, color});
