import { SET_USERNAME } from "../actions/actionTypes";
import { UserReducerState } from "src/types";
import { SetUsernameAction } from "../actions/actionCreators";

const initialState: UserReducerState = {
  username: ''
}


export const userReducer = (state: UserReducerState = initialState, action: SetUsernameAction) => {
  switch (action.type) {
    case SET_USERNAME: return {
      ...state,
      username: action.username
    }

    default: return state;
  }
}