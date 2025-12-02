const express = require("express");
const postController = require("../../controllers/admin/post");
const uploadCover = require("../../middlewares/uploadCover");
const uploadEditorImage = require("../../middlewares/uploadEditorImage");

const router = express.Router();

router.post(
  "/create-post",
  uploadCover.single("coverImage"),
  postController.createPost
);

router.post(
  "/upload-image",
  uploadEditorImage.single("image"),
  postController.postUploadEditorImage
);

router.get("/list-post", postController.getPosts);

router.get("/post/:slug", postController.getPostDetail);

module.exports = router;
