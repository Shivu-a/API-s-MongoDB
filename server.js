let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let db = mongoose.connect("mongodb://localhost/shop");

let Product = require("./model/product");
let WishList = require("./model/wishlist");
const wishlist = require("./model/wishlist");

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

app.post("/wishlists", (request, response) => {
  let wishlist = new WishList();
  wishlist.title = request.body.title;
  wishlist.price = request.body.price;
  wishlist.likes = request.body.likes;
  wishlist.save((err, savedProduct) => {
    if (err) {
      response.status(500).send({ error: "Could not save product" });
    } else {
      response.status(200).send(savedProduct);
    }
  });
});

app.get("/wishlists", (req, res) => {
  WishList.find({})
    .populate({ path: "products", model: "Product" })
    .exec((err, wishlists) => {
      if (err) {
        res.status(500).send("Could not fetch wishlists");
      } else {
        res.send(wishlists);
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

app.put("/wishlist/product/add", (request, response) => {
  Product.findOne({ _id: request.body.productId }, (err, product) => {
    if (err) {
      response.status(500).send({ error: "Could not add item to wishlist" });
    } else {
      WishList.updateOne(
        { _id: request.body.wishListId },
        { $addToSet: { products: product._id } },
        (err, wishlist) => {
          if (err) {
            response
              .status(500)
              .send({ error: "Could not add item to wishlist" });
          } else {
            response.send("Succesfully added item to wishlist");
          }
        }
      );
    }
  });
});
