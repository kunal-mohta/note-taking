import { LOGIN_TRUE } from '../actions/actionTypes';

const initialState = {
  isLogin: true
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_TRUE: return {
      ...state,
      isLogin: true
    }
    default : return state;
  }
}