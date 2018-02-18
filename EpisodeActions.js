import { dispatch } from "./Dispatcher";

export const ADD = "EPISODE#ADD";
export const UP = "EPISODE#UP";
export const DOWN = "EPISODE#DOWN";
export const REMOVE = "EPISODE#REMOVE";

function _dispatch(type, podcastId, episodeId) {
  dispatch({
    type,
    data: { podcastId, episodeId }
  });
}

export function onAddEpisode(podcastId, episodeId) {
  _dispatch(ADD, podcastId, episodeId);
}

export function onUpEpisode(podcastId, episodeId) {
  _dispatch(UP, podcastId, episodeId);
}

export function onDownEpisode(podcastId, episodeId) {
  _dispatch(DOWN, podcastId, episodeId);
}

export function onRemoveEpisode(podcastId, episodeId) {
  _dispatch(REMOVE, podcastId, episodeId);
}
