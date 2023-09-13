import express from "express";
var router = express.Router();
import noticeController from "../controllers/noticeController.js";

router.get("/", noticeController.getNotices);
// router.patch("/:id", noticeController.updatenotices);
// router.put("/:id", noticeController.updatenotice);

export default router;
