const View = require("../../core/View");

class HomeController {
  index(req, res) {
    const view = new View();
    res.send(view.render("home", { 
      title: "Home Page"
    }));
  }
}

module.exports = HomeController;
