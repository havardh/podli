
export default class BaseStore {
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
