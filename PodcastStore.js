import { find, reject } from "lodash";

import { register } from "./Dispatcher";
import PersistentStore from "./PersistentStore";
import { ADD, REMOVE } from "./PodcastActions";

class PodcastStore extends PersistentStore {
  constructor() {
    super("PODLI#PODCAST");
  }

  initialState() {
    return [];
  }

  reduce(state, { type, data }) {
    switch (type) {
      case ADD: {
        const { podcastId } = data;
        if (!find(state, { podcastId })) {
          return [...state, { podcastId }];
        }
      }
      case REMOVE: {
        const { podcastId } = data;
        return reject(state, { podcastId });
      }
      default:
        return state;
    }
  }
}

export default register(new PodcastStore());
