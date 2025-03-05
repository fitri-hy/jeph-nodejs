const View = require("./View");
class Controller {
  constructor(state) {
    this.state = state;
    this.view = new View();
  }
  render(view, data) {
    return this.view.render(view, data);
  }
}
module.exports = Controller;