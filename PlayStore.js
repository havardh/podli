import { register } from "./Dispatcher";

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

class Store {
  state = this.initialState();
  listeners = [];

  initialState() {
    return null;
  }

  emitChange() {
    for (let listener of this.listeners) {
      listener();
    }
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  removeListener(fn) {
    const i = this.listeners.indexOf(fn);
    this.listeners.splice(i, 1);
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

class PlayStore extends Store {
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
