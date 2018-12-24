import { combineReducers } from "redux";
import { loginReducer } from './login';
import { userReducer } from './user';
import { noteReducer } from './note';

export const initialState = {
  isLogin: true,
  activeUserData: {
    username: '',
    notes: []
  }
}

export const rootReducer = combineReducers({
  loginReducer,
  userReducer,
  noteReducer
});