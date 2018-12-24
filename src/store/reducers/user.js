import { SET_ACTIVE_USER_DATA } from "../actions/actionTypes";
import { initialState } from './root';

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER_DATA: return {
      ...state,
      activeUserData: action.newData
    }
    default: return state;
  }
}