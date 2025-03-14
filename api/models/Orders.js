const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
