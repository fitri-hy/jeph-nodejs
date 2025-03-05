const View = require("../../core/View");

class Err404Controller {
  index(req, res) {
    const view = new View();
    res.status(404).send(view.render("404", { title: "404 Not Found" }));
  }
}

module.exports = Err404Controller;
