export const initialState = {
  temp: [],
  userID: 0,
  token: "",
  width: 1280,
  height: 720,
  playerPos: {
    x: 640,
    y: 360
  }
};

export const Reducer = (state = initialState, action) => {
  switch(action.type) {
    case "TEST":
      return {
        ...state, temp: [...state.temp, action.data]
      };
      case "SET_SCREEN_SIZE":
      return {
        ...state, screenSize: action.data
      };
      case "SET_ZOOM":
      return {
        ...state, avgZoom: action.data
      };
      case "SET_MAP_POS":
      return {
        ...state, mapPos: action.data
      };
      case "SET_PLAYER_POS":
      return {
        ...state, playerPos: action.data
      };
    default:
      return state;
  }
};
