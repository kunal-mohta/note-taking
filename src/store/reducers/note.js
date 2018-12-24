import { initialState } from "./root";
import { ADD_NOTE } from "../actions/actionTypes";

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE : {
      let newState = state;
      newState.activeUserData.notes.push(action.newNote);
      return newState;
    }
    default: return state;
  }
}