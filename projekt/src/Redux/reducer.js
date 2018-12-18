export const initialState = {
  user_ID: 0,
  name: "",
  lvl: 1,
  lp: 1,
  dp: 1,
  credits: 0,
  mana: 0,
  items: {},
  questsw: {},
  questso: {},
  x: 0,
  y: 0,
  map: 1, // ta sama wartość co niżej (duplikat ?) -> lepiej zostawić tą
  width: 1280,
  height: 720,
  playerPos: {
    x: 640,
    y: 360,
<<<<<<< HEAD
	map: 1
  },
  graphics: {
	layer1: [],
	layer2: [],
	layer3: [],
	layer4: []
=======
    map: 1 // usunąć ? -> łatwiejsza opcja 
>>>>>>> 4028cb0c7e68a3d8fd0b0d543c0c9be71b55b074
  }
};

export const Reducer = (state = initialState, action) => {
  switch(action.type) {
    case "SAVE_NAME":
	  return {
        ...state, user_ID: action.data.user_ID, name: action.data.name
      };
	case "SAVE_DATA":
	  return {
        ...state, lvl: action.data.lvl, lp: action.data.lp, dp: action.data.dp, credits: action.data.credits, mana: action.data.mana, items: action.data.items, questsw: action.data.questsw, questso: action.data.questso, x: action.data.x, y: action.data.y, map: action.data.map
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
