import express from "express";
import speciesController from "../controllers/speciesController.js";
var router = express.Router();

router.get("/", speciesController.getSpecies);

export default router;
