const express = require("express");
const feedbackController = require("../../controllers/admin/feedback");
const uploadFeedback = require("../../middlewares/uploadFeedback");

const router = express.Router();

router.post(
  "/create-feedback",
  uploadFeedback.array("attachments", 3),
  feedbackController.createFeedback
);

router.get("/list-feedback", feedbackController.getFeedbacks);

router.get("/feedback/:feedbackId", feedbackController.getFeedbackDetail);

router.post(
  "/feedback/:feedbackId/create-comment",
  feedbackController.createComment
);

module.exports = router;
