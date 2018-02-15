import {dispatch} from "./Dispatcher";

export const ADD = "EPISODE#ADD";
export const UP = "EPISODE#UP";
export const DOWN = "EPISODE#DOWN";
export const REMOVE = "EPISODE#REMOVE";

function _dispatch(type, episodeId) {
  dispatch({
    type,
    data: {episodeId},
  });
}

export function onAddEpisode(episodeId) {
  _dispatch(ADD, episodeId);
}

export function onUpEpisode(episodeId) {
  _dispatch(UP, episodeId);
}

export function onDownEpisode(episodeId) {
  _dispatch(DOWN, episodeId);
}

export function onRemoveEpisode(episodeId) {
  _dispatch(REMOVE, episodeId);
}
