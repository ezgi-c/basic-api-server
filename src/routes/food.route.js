const express = require("express");

const { Food } = require("../models/index");

const foodRoutes = express();

// RESTful Route Declarations
foodRoutes.get("/food", getFoods); // Retrieve All
foodRoutes.get("/food/:id", getFood); // Retrieve One
foodRoutes.post("/food", createFood); // Create
foodRoutes.put("/food/:id", updateFood); // Update
foodRoutes.delete("/food/:id", deleteFood); // Delete

async function getFoods(_, res) {
  const allFoods = await Food.findAll();
  res.json(allFoods);
}

async function getFood(req, res, next) {
  const id = req.params.id;
  const food = await Food.findOne({ where: { id: id } });
  if (food === null) {
    next();
  } else {
    res.json(food);
  }
}

async function deleteFood(req, res, next) {
  const id = req.params.id;
  const food = await Food.findOne({ where: { id: id } });
  if (food === null) {
    next();
  } else {
    await food.destroy();
    res.json({});
  }
}

async function createFood(req, res) {
  const name = req.body.name;
  const taste = req.body.taste;
  const food = await Food.create({
    name,
    taste,
  });
  res.json(food);
}

async function updateFood(req, res, next) {
  const id = req.params.id;
  let food = await Food.findOne({ where: { id: id } });
  if (food === null) {
    next();
  } else {
    const name = req.body.name ?? food.name;
    const taste = req.body.taste ?? food.taste;
    let updatedFood = {
      name,
      taste,
    };

    food = await food.update(updatedFood);

    res.json(food);
  }
}

module.exports = {
  foodRoutes,
};
