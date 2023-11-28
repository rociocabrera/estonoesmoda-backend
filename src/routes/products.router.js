const { Router } = require("express");
const router = Router();
const ProductManager = require("../managers/productManager");

// The ProductManager class is instantiated with the path to the products.json file.
const productManager = new ProductManager("./src/products.json");

router.get("/", async (req, res) => {
  console.log(await productManager.getProducts());
  let limit = req.query.limit;
  const returnProducts = await productManager.getProducts();
  if (limit) {
    res.status(200).json({ status: "ok", data: returnProducts.slice(0, limit) });
    // returnProducts.slice(0, limit) returns the first limit products
  } else {
    res.status(200).json({ status: "ok", data: returnProducts });
    // returnProducts returns all products
  }
});

// The router.get() method is used to define a route handler for the GET HTTP method to the path /products/:pid.
router.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    res.status(200).json({ status: "ok", data: product });
    // If the product is found, it responds with a status code of 200 and the product in JSON format.
  } catch (error) {
    // If the product is not found, it responds with a status code of 404 and an error message in JSON format.
    res.status(404).json({ status: "error", message: error.message });
  }
});

module.exports = router;
