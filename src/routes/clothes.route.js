const express = require('express');

const { Clothes } = require('../models/index');

const clothesRoutes = express();

// RESTful Route Declarations
clothesRoutes.get('/clothes', getClothes); // Retrieve All
clothesRoutes.get('/clothes/:id', getCloth); // Retrieve One
clothesRoutes.post('/clothes', createCloth); // Create
clothesRoutes.put('/clothes/:id', updateCloth); // Update
clothesRoutes.delete('/clothes/:id', deleteCloth); // Delete

async function getClothes(_, res) {
  const allClothes = await Clothes.findAll();
  res.json(allClothes);
}

async function getCloth(req, res, next) {
  const id = req.params.id;
  const cloth = await Clothes.findOne({ where: { id: id } });
  if (cloth === null) {
    next();
  } else {
    res.json(cloth);
  }
}

async function deleteCloth(req, res, next) {
  const id = req.params.id;
  const cloth = await Clothes.findOne({ where: { id: id } });
  if (cloth === null) {
    next();
  } else {
    await cloth.destroy();
    res.json({});
  }
}

async function createCloth(req, res) {
  const name = req.body.name;
  const color = req.body.color;
  const cloth = await Clothes.create({
    name,
    color,
  });
  res.json(cloth);
}

async function updateCloth(req, res, next) {
  const id = req.params.id;
  let cloth = await Clothes.findOne({ where: { id: id } });
  if (cloth === null) {
    next();
  } else {
    const name = req.body.name ?? cloth.name;
    const color = req.body.color ?? cloth.color;
    let updatedCloth = {
      name,
      color,
    };

    cloth = await cloth.update(updatedCloth);

    res.json(cloth);
  }
}

module.exports = {
  clothesRoutes
};