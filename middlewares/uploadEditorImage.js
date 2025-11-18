const multer = require("multer");
const path = require("path");

const storageEditor = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/editor/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

const uploadEditorImage = multer({
  storage: storageEditor,
  fileFilter,
});

module.exports = uploadEditorImage;
