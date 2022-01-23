const express = require("express");
const morgan = require("morgan");
const server = express();

const cors = require("cors");

const materialsRouter = require("./routes/materialsRouter.js");
const weaponsRouter = require("./routes/weaponsRouter.js");

// Middleware
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// Routers
server.use("/api/material", materialsRouter);
server.use("/api/weapon", weaponsRouter);

//Routes
server.get("/", (req, res) => {
  res.status(200).send("Vention Quest");
});

module.exports = server;
