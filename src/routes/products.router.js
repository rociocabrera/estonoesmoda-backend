const { Router } = require("express");
const router = Router();
const ProductManager = require("../managers/productManager");

// The ProductManager class is instantiated with the path to the products.json file.
const productManager = new ProductManager("./src/data/products.json");
// Load products from json file
productManager.getProducts().then(() => {});

router.get("/", async (req, res) => {
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
// The router.post() method is used to define a route handler for the POST HTTP method to the path /products.
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, price, thumbnails, code, stock, status, category } = req.body;
    const product = await productManager.addProduct(title, description, price, thumbnails, code, stock, status, category);
    const socketIo = req.app.get("socketio");
    const products = await productManager.getProducts();
    socketIo.emit("update-products", products);
    res.status(201).json({ status: "ok", data: product });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
// The router.put() method is used to define a route handler for the PUT HTTP method to the path /products/:pid.
router.put("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const { title, description, price, thumbnails, code, stock, status, category } = req.body;
    const product = await productManager.updateProduct(id, title, description, price, thumbnails, code, stock, status, category);
    res.status(200).json({ status: "ok", data: product });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
// The router.delete() method is used to define a route handler for the DELETE HTTP method to the path /products/:pid.
router.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    await productManager.deleteProduct(id);
    const socketIo = req.app.get("socketio");
    const products = await productManager.getProducts();
    socketIo.emit("update-products", products);
    res.status(200).json({ status: "ok", message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

module.exports = router;
