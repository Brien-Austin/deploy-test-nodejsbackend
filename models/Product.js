const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    cat: { type: Array },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
