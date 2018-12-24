import { initialState } from "./root";
import { ADD_LABEL, ADD_NOTE, DELETE_LABEL, DELETE_NOTE, SET_NOTES } from "../actions/actionTypes";

export const notesReducer = (state = initialState, action) => {
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

    // case ADD_LABEL: {
    //   stateNotes[action.noteIndex].labels.push(action.label);
    //   return {
    //     ...state,
    //     notes: stateNotes
    //   };
    // }

    // case DELETE_LABEL: {
    //   stateNotes[action.noteIndex].labels.splice(action.labelIndex, 1);
    //   return {
    //     ...state,
    //     notes: stateNotes
    //   }
    // }


    default: return state;
  }
}