const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    productId: {
      type: String,
    },
    userId: {
      type: String,
    },
    score: {
      type: Number,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reviews", ReviewSchema);
