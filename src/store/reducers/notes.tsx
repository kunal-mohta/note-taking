import { ADD_LABEL, ADD_NOTE, DELETE_LABEL, DELETE_NOTE, SET_NOTES, ADD_COLOR } from "../actions/actionTypes";
import { NotesReducerState } from "src/types";
import { SetNotesAction, AddNoteAction, AddLabelAction, DeleteNoteAction, DeleteLabelAction, AddColorAction } from "../actions/creators/notes";

const initialState: NotesReducerState = {
  notes: []
}

type NotesAction = SetNotesAction | AddNoteAction | DeleteNoteAction |  AddLabelAction | DeleteLabelAction | AddColorAction;

export const notesReducer = (state: NotesReducerState = initialState, action: NotesAction) => {
  switch (action.type) {
    case SET_NOTES: {
      return {
        ...state,
        notes: action.notes
      }
    }

    case ADD_NOTE : {
      return {
        ...state,
        notes: [...state.notes, action.newNote]
      }
    }

    case DELETE_NOTE : {
      return {
        ...state,
        notes: [...state.notes.slice(0, action.index), ...state.notes.slice(action.index + 1)]
      }
    }

    case ADD_LABEL: {
      let notes = [...state.notes];
      let note = {...notes[action.noteIndex]};
      let labels = (note.labels) ? [...note.labels] : [];
      labels.push(action.label);
      note.labels = labels;
      notes[action.noteIndex] = note;

      return {
        ...state,
        notes
      }
    }

    case DELETE_LABEL: {
      let notes = [...state.notes];
      let note = {...notes[action.noteIndex]};
      let labels = (note.labels) ? [...note.labels] : [];      
      labels.splice(action.labelIndex, 1);
      note.labels = labels;
      notes[action.noteIndex] = note;

      return {
        ...state,
        notes
      }
    }

    case ADD_COLOR: {
      let notes = [...state.notes];
      let note = {...notes[action.noteIndex]};
      note.color = action.color;
      notes[action.noteIndex] = note;

      return {
        ...state,
        notes
      }
    }

    default: return state;
  }
}