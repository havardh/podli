import { AsyncStorage } from "react-native";
import { findIndex } from "lodash";

import { register } from "./Dispatcher";
import BaseStore from "./BaseStore";
import { ADD, REMOVE, UP, DOWN } from "./EpisodeActions";

const KEY = "PODLI#EPISODES";

async function get(key) {
  const items = await AsyncStorage.getItem(key);
  if (items == null) {
    return null;
  } else {
    return JSON.parse(items);
  }
}

async function set(key, items) {
  await AsyncStorage.setItem(key, JSON.stringify(items));
}

async function remove(key) {
  await AsyncStorage.removeItem(key);
}

class PersistentStore extends BaseStore {
  constructor(key) {
    super();
    this.key = key;
    get(key).then(state => {
      this.setState(state || this.initialState());
      this.emitChange();
    });
  }

  setState(state) {
    set(this.key, state);
    super.setState(state);
  }

  async clear() {
    await remove(this.key);
  }
}

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
        const i = findIndex(state, { podcastId, episodeId });
        if (i !== -1) {
          return state.splice(i, 1);
        } else {
          return state;
        }
      }
      default:
        return state;
    }
  }
}

export default register(new EpisodeStore());
