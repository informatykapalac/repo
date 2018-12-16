export const initialState = {
  user_ID: 0,
  name: "",
  width: 1280,
  height: 720,
  map: 1,
  playerPos: {
    x: 640,
    y: 360
  }
};

export const Reducer = (state = initialState, action) => {
  switch(action.type) {
    case "SAVE_NAME":
	  return {
        ...state, user_ID: action.data.user_ID, name: action.data.name
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