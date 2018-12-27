import { ADD_NOTE, ADD_LABEL, DELETE_LABEL, DELETE_NOTE, ADD_COLOR, SET_NOTES } from '..//actionTypes';
import { DEFAULT_NOTE_COLOR } from '../../../constants';
import { NoteType, StoreState, ThunkActionReturn } from 'src/types';
import { Dispatch } from 'redux';


export interface SetNotesAction {
  type: SET_NOTES,
  notes: NoteType[]
}

export const setNotes = (notes: NoteType[]): SetNotesAction => ({ type: SET_NOTES, notes });


export interface AddNoteAction {
  type: ADD_NOTE,
  newNote: NoteType
}

export const addNote = (newNoteData: NoteType): ThunkActionReturn => {
  return (dispatch: Dispatch<AddNoteAction>, getState: () => StoreState) => {
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


export interface DeleteNoteAction {
  type: DELETE_NOTE,
  index: number
}

export const deleteNote = (index: number): DeleteNoteAction => ({ type: DELETE_NOTE, index});


export interface AddLabelAction {
  type: ADD_LABEL,
  noteIndex: number,
  label: string
}

export const addLabel = (noteIndex: number, label: string): AddLabelAction => ({ type: ADD_LABEL, noteIndex, label});


export interface DeleteLabelAction {
  type: DELETE_LABEL,
  noteIndex: number,
  labelIndex: number
}

export const deleteLabel = (noteIndex: number, labelIndex: number): DeleteLabelAction => ({ type: DELETE_LABEL, noteIndex, labelIndex });


export interface AddColorAction {
  type: ADD_COLOR,
  noteIndex: number,
  color: string
}

export const addColor = (noteIndex: number, color: string): AddColorAction => ({ type: ADD_COLOR, noteIndex, color});
