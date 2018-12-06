export const initialState = {
  temp: [],
  userID: 0,
  token: "",
  width: 1280,
  height: 720,
};

export const Reducer = (state = initialState, action) => {
  switch(action.type) {
    case "TEST":
      return {
        ...state, temp: [...state.temp, action.data]
      };
      case "SET_WIDTH":
      return {
        ...state, width: action.data
      };
      case "SET_HEIGHT":
      return {
        ...state, height: action.data
      };
    default:
      return state;
  }
};
