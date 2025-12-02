const slugify = require("slugify");
const upload = require("../../middlewares/uploadCover");
const Post = require("../../models/Post");

exports.createPost = async (req, res, next) => {
  try {
    let { title, summary, body } = req.body;

    slug = slugify(title, { lower: true, strict: true });

    const existed = await Post.findOne({ slug });
    if (existed) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    let coverImage = "";
    if (req.file) {
      coverImage = `/uploads/cover/${req.file.filename}`;
    }

    const newPost = new Post({
      title,
      slug,
      summary,
      coverImage,
      body,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.postUploadEditorImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const url = `/uploads/editor/${req.file.filename}`;

    return res.json({ url });
  } catch (err) {
    console.error("Upload image error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } catch (error) {}
};

exports.getPostDetail = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
