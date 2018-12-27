import { combineReducers } from "redux";
import { loginReducer } from './login';
import { userReducer } from './user';
import { notesReducer } from './notes';
import { StoreState } from "src/types";

export const rootReducer = combineReducers<StoreState>({
  loginReducer,
  userReducer,
  notesReducer
} as any);