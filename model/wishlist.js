let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let wishlist = new Schema({
  title: { type: String, default: "Cool Wish List" },
  products: [{ type: ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("WishList", wishlist);
