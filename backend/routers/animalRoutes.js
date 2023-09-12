import express from "express";
var router = express.Router();

import animalController from "../controllers/animalController.js";
router.get("/animals", animalController.getAnimals);

export default router;
