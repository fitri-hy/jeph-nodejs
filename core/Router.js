const web = require("../app/routes/web");
const api = require("../app/routes/api");

class Router {
  constructor(app, state) {
    this.validMethods = ["get", "post", "put", "delete", "patch", "options", "head"];

    web.forEach(({ path, controller, method, action }) => {
      this.registerRoute(app, state, path, `../app/controllers/${controller}`, method, action);
    });

    api.forEach(({ path, controller, method, action }) => {
      this.registerRoute(app, state, path, `../app/controllers/api/${controller}`, method, action);
    });
  }

  registerRoute(app, state, path, controllerPath, method, action) {
    try {
      const httpMethod = method.toLowerCase();

      if (!this.validMethods.includes(httpMethod)) {
        console.error(`Invalid HTTP method "${method}" for route "${path}"`);
        return;
      }

      const ControllerClass = require(controllerPath);
      const controllerInstance = new ControllerClass(state);

      if (typeof controllerInstance[action] !== "function") {
        console.error(`Action "${action}" not found in controller "${controllerPath}"`);
        return;
      }

      app[httpMethod](path, (req, res) => controllerInstance[action](req, res));
    } catch (error) {
      console.error(`Error loading controller "${controllerPath}":`, error.message);
    }
  }
}

module.exports = Router;
