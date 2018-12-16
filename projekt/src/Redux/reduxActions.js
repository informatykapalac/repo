export const test = value => ({
  type: "TEST",
  data: value
});
export const setScreenSize = (width, height) => ({
  type: "SET_SCREEN_SIZE",
  data: {
    w: width,
    h: height
  }
});
export const setMapPos = (x, y) => ({
  type: "SET_MAP_POS",
  data: {
    x: x,
    y: y
  }
});
export const setPlayerPos = (x, y) => ({
  type: "SET_PLAYER_POS",
  data: {
    x: x,
    y: y
  }
});
export const setZoom = value => ({
  type: "SET_ZOOM",
  data: value
});
export const saveName = value => ({
  type: "SAVE_NAME",
  data: value
});
export const saveData = value => ({
  type: "SAVE_DATA",
  data: value
});