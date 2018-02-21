import { dispatch } from "../Dispatcher";

import PlayStore from "../stores/PlayStore";

export const START = "PLAY#START";
export const END = "PLAY#END";
export const PAUSE = "PLAY#PAUSE";
export const STOP = "PLAY#STOP";
export const STATUS = "PLAY#STATUS";

export const SET_VOLUME = "PLAY#SET_VOLUME";
export const SET_POSITION = "PLAY#SET_POSITION";
export const SET_RATE = "PLAY#SET_RATE";

export function onPlayStart(podcastId, episodeId, durationMillis) {
  dispatch({
    type: START,
    data: {
      podcastId,
      episodeId,
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
  const { podcastId, episodeId, durationMillis } = PlayStore.getState();
  dispatch({
    type: SET_POSITION,
    data: {
      position,
      durationMillis,
      podcastId,
      episodeId
    }
  });
}
