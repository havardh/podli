import { register } from "../Dispatcher";
import PersistentStore from "./PersistentStore";

import { SET_POSITION } from "../actions/PlayActions";
import PlayStore from "./PlayStore";

class ProgressStore extends PersistentStore {
  constructor() {
    super("PODLI#PROGRESS");
  }

  initialState() {
    return {};
  }

  get({ podcastId, episodeId }) {
    return this.getState()[`${podcastId}#${episodeId}`] || {};
  }

  getPosition({ podcastId, episodeId }) {
    return this.get({ podcastId, episodeId }).position || 0.0;
  }

  getPositionMillis({ podcastId, episodeId }) {
    const progress = this.get({ podcastId, episodeId });
    if (progress.position && progress.durationMillis) {
      const { position, durationMillis } = progress;
      return position * durationMillis;
    } else {
      return 0.0;
    }
  }

  reduce(state, { type, data }) {
    switch (type) {
      case SET_POSITION:
        const { podcastId, episodeId, position, durationMillis } = data;

        const key = `${podcastId}#${episodeId}`;

        return { ...state, [key]: { position, durationMillis } };
      default:
        return state;
    }
  }
}

export default register(new ProgressStore());
