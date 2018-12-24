import { initialState } from './root';

import { SET_USERNAME } from "../actions/actionTypes";

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME: return {
      ...state,
      username: action.username
    }

    default: return state;
  }
}