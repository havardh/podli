import { dispatch } from "./Dispatcher";

export const START = "PLAY#START";
export const END = "PLAY#END";
export const PAUSE = "PLAY#PAUSE";
export const STOP = "PLAY#STOP";
export const STATUS = "PLAY#STATUS";

export const SET_VOLUME = "PLAY#SET_VOLUME";
export const SET_POSITION = "PLAY#SET_POSITION";
export const SET_RATE = "PLAY#SET_RATE";

export function onPlayStart(id, durationMillis) {
  dispatch({
    type: START,
    data: {
      id,
      durationMillis
    }
  });
}

export function onPlayEnd() {
  dispatch({ type: END });
}

export function onPlayPause() {
  dispatch({ type: PAUSE });
}

export function onPlayStop() {
  dispatch({ type: STOP });
}

export function onPlayStatus(status) {
  dispatch({ type: STATUS, data: { status } });
}

export function onSetVolume(volume) {
  dispatch({ type: SET_VOLUME, data: { volume } });
}

export function onSetPosition(position) {
  dispatch({ type: SET_POSITION, data: { position } });
}
