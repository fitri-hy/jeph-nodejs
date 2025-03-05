const express = require("express");
const path = require("path");
const Router = require("./Router");
const State = require("./State");

class Framework {
  constructor() {
    this.app = express();
    this.state = new State();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.router = new Router(this.app, this.state);
    this.app.use(express.static(path.join(__dirname, "..", "public")));

    this.app.use((req, res, next) => {
      const Err404Controller = require("../app/controllers/Err404Controller");
      new Err404Controller().index(req, res);
    });
  }

  start(port) {
    this.app.listen(port, () => console.log(`Server running on port ${port}`));
  }
}

module.exports = Framework;
