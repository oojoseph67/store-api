require("dotenv").config();
require('express-async-errors')

const express = require("express");
const app = express();

const connectDB = require("./db/index.js");
const productsRouter = require("./routes/index.js");

const notFoundMiddleware = require("./middleware/not-found.js");
const errorMiddleware = require("./middleware/error-handler.js");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>');
});

app.use("/api/v1/products", productsRouter);

// products route

// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}`));
  } catch (error) {
    console.log("🚀 ~ file: index.js:31 ~ start ~ error:", error);
  }
};

start();
