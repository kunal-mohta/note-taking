import { ADD_NOTE, ADD_LABEL, DELETE_LABEL, DELETE_NOTE, ADD_COLOR, SET_NOTES } from '..//actionTypes';
import { DEFAULT_NOTE_COLOR } from '../../../constants';

export const setNotes = (notes) => ({ type: SET_NOTES, notes });

// export const addNote = (newNote) => ({ type: ADD_NOTE, newNote });
export const addNote = (newNoteData) => {
  return (dispatch, getState) => {
    let newNote = {
      title: newNoteData.title,
      content: newNoteData.content,
      labels: [],
      color: DEFAULT_NOTE_COLOR,
      created: '',
      updated: ''
    }
    dispatch({ type: ADD_NOTE, newNote });
  }
}

export const deleteNote = (index) => ({ type: DELETE_NOTE, index});
export const addLabel = (noteIndex, label) => ({ type: ADD_LABEL, noteIndex, label});
export const deleteLabel = (noteIndex, labelIndex) => ({ type: DELETE_LABEL, noteIndex, labelIndex });
export const addColor = (noteIndex, color) => ({ type: ADD_COLOR, noteIndex, color});
