export const initialState = {
  temp: [],
  userID: 0,
  token: 0
};

export const Reducer = (state = initialState, action) => {
  switch(action.type) {
    case "TEST":
      return {
        ...state, temp: [...state.temp, action.data]
      };
    default:
      return state;
  }
};
