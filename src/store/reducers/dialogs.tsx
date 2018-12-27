import { CLEAR_NOTE_DIALOG } from "../actions/actionTypes";

const initialState = {
  addNoteDialog: {
    title: '',
    content: ''
  }
}

export const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_NOTE_DIALOG: return {
      ...state,
      addNoteDialog: {
        title: '',
        content: ''
      }
    }
  }
}