const Product = require("../models/index.js");

const getAllProductsStatic = async (req, res) => {
  // throw new Error(`testing async errors`);
  const products = await Product.find({ rating: 5 });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: `product testing route` });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
