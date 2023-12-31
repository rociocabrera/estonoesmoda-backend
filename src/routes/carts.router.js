const { Router } = require("express");
const router = Router();
const CartManager = require("../managers/cartManager");

const cartManager = new CartManager("./src/data/carts.json");
// Load carts from json file
cartManager.getCarts().then(() => {});

// router.post add a new product to the cart
router.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await cartManager.addCart(products);
    res.status(201).json({ status: "ok", data: cart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// The get/:cid route handler is used to get a cart by id
router.get("/:cid", async (req, res) => {
  try {
    const id = parseInt(req.params.cid);
    const cart = await cartManager.getCartsById(id);
    res.status(200).json({ status: "ok", data: cart });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

// router.post add a new product to the cart
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.cid);
    const product = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);
    const cart = await cartManager.addProductToCart(id, product, quantity);
    res.status(200).json({ status: "ok", data: cart });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

module.exports = router;
