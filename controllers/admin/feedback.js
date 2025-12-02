const Feedback = require("../../models/Feedback");
const Comment = require("../../models/Comment");

exports.createFeedback = async (req, res, next) => {
  try {
    let { name, phoneNumber, email, title, content } = req.body;
    const files = req.files || [];

    const attachments = files.map((f) => `/uploads/feedback/${f.filename}`);

    const newFeedback = new Feedback({
      senderName: name,
      phoneNumber,
      email,
      title,
      content,
      attachments,
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getFeedbacks = async (req, res, next) => {
  try {
    try {
      const posts = await Feedback.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } catch (error) {}
};
exports.getFeedbackDetail = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;

    const feedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { $inc: { viewCount: 1 } },
      { new: true }
    ).populate("comments");

    if (!feedback) {
      return res.status(404).json({
        message: "Không tìm thấy feedback",
      });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// thêm comment vào feedback
exports.createComment = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const { content, user } = req.body ?? {};
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    const comment = await Comment.create({ content, user, ipAddress });

    await Feedback.findByIdAndUpdate(feedbackId, {
      $push: { comments: comment._id },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
