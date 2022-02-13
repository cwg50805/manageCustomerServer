const express = require("express");
const bodyParser = require('body-parser');
const validJWTNeeded = require('../middleware/auth');
const cors = require('cors');
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT; // Loaded from .env file
    this.paths = {
      common: "/api",
      auth: "/api/auth",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors()); // Enable CORS
  }

  // Bind controllers to routes
  routes() {
    this.app.use(express.json());
    this.app.use(this.paths.common, require("../routes/common"));
    this.app.use(validJWTNeeded);
    this.app.use(this.paths.auth, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;