const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    seen: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
