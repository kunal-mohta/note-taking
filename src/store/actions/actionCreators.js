import { LOGIN_TRUE, SET_ACTIVE_USER_DATA, ADD_NOTE, ADD_LABEL } from './actionTypes';

export const loginTrue = () => ({ type: LOGIN_TRUE })
export const setActiveUserData = (newData) => ({ type: SET_ACTIVE_USER_DATA, newData })
export const addNote = (newNote) => ({ type: ADD_NOTE, newNote })
export const addLabel = (noteIndex, newLabel) => ({ type: ADD_LABEL, noteIndex, newLabel});