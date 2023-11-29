const { Router } = require("express");
const router = Router();
const CartManager = require("../managers/cartManager");

const cartManager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await cartManager.addCart(products);
    res.status(201).json({ status: "ok", data: cart });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

module.exports = router;
