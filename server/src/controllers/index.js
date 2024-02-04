const Product = require("../models/index.js");

const getAllProductsStatic = async (req, res) => {
  // throw new Error(`testing async errors`);
  const products = await Product.find({});
  const nbHits = products.length;

  res.status(200).json({ nbHits, products });
};

const getAllProducts = async (req, res) => {
  try {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    let queryObject = {};

    if (featured) {
      queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      // this format supports the search of few know words for the query
      queryObject.name = { $regex: name, $options: "i" };
    }
    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const reqEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericfilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}`
      );
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-')
          if(options.includes(field)){
            queryObject[field] = {[operator]: Number(value)}
          }
        })
      
    }

    console.log(queryObject);

    // const product = await Product.find({ company: company });
    let result = Product.find(queryObject);
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }

    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const product = await result;
    const nbHits = product.length;

    res.status(200).json({ nbHits, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
