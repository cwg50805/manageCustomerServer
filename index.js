const express = require('express');
const db = require("./sqlite/sqlite");
const customer = require("./sqlite/customer");
const app = express();

  
require('dotenv').config(); // Load environment variables from .env file
const Server = require('./models/server');
const server = new Server();
var c = new customer(db);
server.listen();

process.on('SIGINT', function() {
    console.log("close connection to database")
    db.close();
    process.exit();
});