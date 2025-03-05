class State {
  constructor() {
    this.globalState = {};
  }
  set(key, value) {
    this.globalState[key] = value;
  }
  get(key) {
    return this.globalState[key];
  }
}
module.exports = State;