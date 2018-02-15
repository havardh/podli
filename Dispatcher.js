const debug = false;

const stores = [];

export function register(store) {
  stores.push(store);
  return store;
}

export function dispatch(action) {
  for (let store of stores) {

    const prevState = store.getState()
    const nextState = store.reduce(prevState, action);
    store.setState(nextState);

    if (debug === true) {
      console.log(store.constructor.name + ".reduce(state, action): ")
      console.log("");
      console.log("---- Prev State: ")
      console.log(prevState);
      console.log("---- Action: ")
      console.log(action);
      console.log("---- Next State: ")
      console.log(nextState);
      console.log("");
    }

    store.emitChange();
  }
}
