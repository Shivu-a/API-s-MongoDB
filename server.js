let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let db = mongoose.connect("mongodb://localhost/shop");

let Product = require("./model/product");
let WishList = require("./model/wishlist");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("Server running on 3000");
});

app.post("/product", (request, response) => {
  let product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;
  product.likes = request.body.likes;
  product.save((err, savedProduct) => {
    if (err) {
      response.status(500).send({ error: "Could not save product" });
    } else {
      response.status(200).send(savedProduct);
    }
  });
});

app.get("/product", (request, response) => {
  Product.find({}, (err, products) => {
    if (err) {
      response.status(500).send({ error: "Could not fetch the product" });
    } else {
      response.send(products);
    }
  });
});
