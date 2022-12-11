const express = require("express");

const { logger } = require("./middleware/logger");

const { clothesRoutes } = require("./routes/clothes.route");
const { foodRoutes } = require("./routes/food.route");

const { notFound } = require("./error-handlers/404");
const { serverError } = require("./error-handlers/500");

const server = express();

server.use(logger);
server.use(express.json());

server.use(clothesRoutes);
server.use(foodRoutes);

server.use(notFound);
server.use(serverError);

module.exports = { server };
