import { combineReducers } from "redux";
import { loginReducer } from './login';
import { userReducer } from './user';
import { notesReducer } from './notes';

export const rootReducer = combineReducers({
  loginReducer,
  userReducer,
  notesReducer
});