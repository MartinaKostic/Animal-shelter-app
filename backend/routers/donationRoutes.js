import express from "express";
var router = express.Router();
import donationController from "../controllers/donationController.js";

router.get("/", donationController.getDonations);
router.patch("/:id", donationController.updateDonatedCategory);
// router.put("/:id", donationController.updateDonation);

export default router;
