const express = require("express");
const router = express.Router();
const Product = require("./models/Product.model");


router.get("/proDuct", async (req, res) => {
  //const { img, titleName, description } = req.body;
  //let result = await Product.findAll({
  //img: img,
  //titleName: titleName,
  //description: description,
  //});
  //res.json(result);

  // test
  const { name, price } = req.body;
  let result = await Product.find({ name: name, price: price });
  res.json(result);
});

module.exports = router;
