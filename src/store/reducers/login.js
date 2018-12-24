import { initialState } from './root';
import { LOGIN_TRUE } from '../actions/actionTypes';

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_TRUE: return {
      ...state,
      isLogin: true
    }
    default : return state;
  }
}