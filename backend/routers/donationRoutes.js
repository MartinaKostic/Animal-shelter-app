import express from "express";
var router = express.Router();
import donationController from "../controllers/donationController.js";

router.get("/", donationController.getDonations);
router.patch("/:id", donationController.updateDonatedCategory);
router.post("/", donationController.createDonation);
router.delete("/:id", donationController.deleteDonation);

export default router;
