import { AsyncStorage } from "react-native";
import BaseStore from "./BaseStore";

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

export default class PersistentStore extends BaseStore {
  constructor(key) {
    super();
    this.key = key;
    //this.clear();
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
