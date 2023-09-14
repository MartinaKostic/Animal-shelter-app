import express from "express";
var router = express.Router();
import speciesController from "../controllers/speciesController.js";

router.get("/", speciesController.getSpecies);

export default router;
