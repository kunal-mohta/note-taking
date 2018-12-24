const initialState = {
  isLogin: true,
  activeUserData: {
    username: '',
    notes: []
  }
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default : return {
      ...state
    }
  }
}