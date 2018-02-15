import { register } from "./Dispatcher";
import BaseStore from "./BaseStore";

import {
  START,
  END,
  PAUSE,
  STOP,
  STATUS,
  SET_VOLUME,
  SET_POSITION,
  SET_RATE
} from "./PlayActions";

class PlayStore extends BaseStore {
  initialState() {
    return {
      volume: 1.0,
      position: 0.0,
      rate: 1.0,
    };
  }

  getId() {
    return this.state.id;
  }

  getVolume() {
    return this.state.volume || 1.0;
  }

  getDurationMillis() {
    return this.state.durationMillis;
  }

  reduce(state, { type, data }) {
    switch (type) {
      case START:
        const {id, durationMillis} = data;
        return {...state, id, durationMillis};
      case END:
        return {...state, id: null};
      case PAUSE:
        return state;
      case STOP:
        return {...state, id: null};
      case SET_VOLUME:
        const { volume } = data;
        return { ...state, volume };
      case SET_POSITION:
        const { position } = data;
        return { ...state, position };
      case SET_RATE:
        const { rate } = data;
        return { ...state, rate };
      default:
        return state;
    }
  }
}

export default register(new PlayStore());
