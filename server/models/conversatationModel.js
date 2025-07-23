const mongoose = require("mongoose");
const UserModel = require("./userMode");

const conversatationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const ConversatationModel = mongoose.model(
  "Conversatation",
  conversatationSchema
);

module.exports = ConversatationModel;
