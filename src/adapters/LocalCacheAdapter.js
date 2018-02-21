import { AsyncStorage } from "react-native";

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

export default class Cache {
  constructor(name, config = { ttl: 1, default: {} }) {
    this.name = name;
    this.config = config;
    this.cache = null;
  }

  async ensurePopulated() {
    if (this.cache == null) {
      const cache = await get(this.name);
      this.cache = cache || this.config.default;
    }
  }

  async get(key, fn) {
    // const time = new Date();
    await this.ensurePopulated();

    if (this.cache[key]) {
      return this.cache[key].value;
    } else {
      const value = await fn(key);
      this.cache[key] = { value };

      await set(this.name, this.cache);
      return value;
    }
  }
}
