class ApiController {
  index(req, res) {
    res.json({ message: "Welcome to APIs" });
  }
}

module.exports = ApiController;
