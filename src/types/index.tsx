import { Dispatch } from "redux";

export interface NoteType {
  title: string,
  content: string,
  labels?: string[],
  color?: string,
  created?: string,
  updated?: string,
  [key: string]: string | string[] | undefined
}

export interface UserReducerState {
  username: string
}

export interface NotesReducerState {
  notes: NoteType[]
}

export interface LoginReducerState {
  isLogin: boolean
}

export interface DialogReducerState {
  addNoteDialog: {
    title: string,
    content: string
  }
}

export interface StoreState {
  userReducer: UserReducerState,
  notesReducer: NotesReducerState,
  loginReducer: LoginReducerState,
  dialogReducer: DialogReducerState
}

export type ThunkActionReturn = (dispatch: Dispatch, getState: () => StoreState) => void;