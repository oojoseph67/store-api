require("dotenv").config();

const connectDB = require("./src/db/index.js");
const Product = require("./src/models/index.js");

const jsonProducts = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("SUCCESS");
    process.exit(0);
  } catch (error) {
    console.log("🚀 ~ start ~ error:", error);
    process.exit(1);
  }
};

start();
