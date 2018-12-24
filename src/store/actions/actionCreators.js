import { LOGIN_TRUE, SET_ACTIVE_USER_DATA, ADD_NOTE, ADD_LABEL, DELETE_LABEL, DELETE_NOTE, ADD_COLOR } from './actionTypes';

export const loginTrue = () => ({ type: LOGIN_TRUE })
export const setActiveUserData = (newData) => ({ type: SET_ACTIVE_USER_DATA, newData })
export const addNote = (newNote) => ({ type: ADD_NOTE, newNote })
export const addLabel = (noteIndex, newLabel) => ({ type: ADD_LABEL, noteIndex, newLabel});
export const deleteLabel = (noteIndex, labelIndex) => ({ type: DELETE_LABEL, noteIndex, labelIndex });
export const deleteNote = (index) => ({ type: DELETE_NOTE, index});
export const addColor = (noteIndex, color) => ({ type: ADD_COLOR, noteIndex, color});
