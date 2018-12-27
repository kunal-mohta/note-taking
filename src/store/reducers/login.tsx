import { LOGIN_TRUE } from '../actions/actionTypes';
import { LoginTrueAction } from '../actions/actionCreators';

const initialState = {
  isLogin: true
}

export const loginReducer = (state = initialState, action: LoginTrueAction) => {
  switch (action.type) {
    case LOGIN_TRUE: return {
      ...state,
      isLogin: true
    }
    default : return state;
  }
}