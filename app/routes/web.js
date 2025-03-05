module.exports = [
  { path: "/", method: "get", controller: "HomeController", action: "index" },
  { path: "/spelled",  method: "get", controller: "SpelledController",action: "index" },
  { path: "/spelled",  method: "post", controller: "SpelledController",action: "convert" }
];
