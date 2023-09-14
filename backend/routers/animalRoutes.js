import express from "express";
var router = express.Router();
import animalController from "../controllers/animalController.js";

router.get("/", animalController.getAnimals);
router.patch("/:id", animalController.updateAdoptionStatus);
router.put("/:id", animalController.updateAnimal);
router.post("/", animalController.createAnimal);

export default router;
