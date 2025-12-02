const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    title: String,
    content: { type: String, required: true },
    attachments: [String],

    isAnonymous: { type: Boolean, default: false },
    senderName: String,
    email: String,
    phoneNumber: String,
    status: { type: String, default: "pending" },
    reply: {
      content: String,
      leaderName: String,
      position: String,
      repliedAt: Date,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    resolvedAt: Date,
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
