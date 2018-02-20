import { findIndex, reject } from "lodash";

import { register } from "../Dispatcher";
import PersistentStore from "./PersistentStore";
import { ADD, REMOVE, UP, DOWN } from "../actions/EpisodeActions";

const KEY = "PODLI#EPISODES";

class EpisodeStore extends PersistentStore {
  constructor() {
    super(KEY);
  }

  initialState() {
    return [];
  }

  reduce(state, { type, data }) {
    switch (type) {
      case ADD: {
        const { podcastId, episodeId } = data;
        if (findIndex(state, { podcastId, episodeId }) === -1) {
          return [...state, { podcastId, episodeId }];
        } else {
          return state;
        }
      }
      case UP: {
        const { podcastId, episodeId } = data;
        const i = findIndex(state, { podcastId, episodeId });
        if (i === -1 || i === 0) {
          return state.splice(i, 1).splice(i - 1, 0, { podcastId, episodeId });
        } else {
          return state;
        }
      }
      case DOWN: {
        const { podcastId, episodeId } = data;
        const i = findIndex(state, { podcastId, episodeId });
        const n = state.length;
        if (i === -1 || i === n - 1) {
          return state.splice(i, 1).splice(i + 1, 0, { podcastId, episodeId });
        } else {
          return state;
        }
      }
      case REMOVE: {
        const { podcastId, episodeId } = data;
        return reject(state, { podcastId, episodeId });
      }
      default:
        return state;
    }
  }
}

export default register(new EpisodeStore());
