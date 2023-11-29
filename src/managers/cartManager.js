const fs = require("node:fs");
const ProductManager = require("../managers/productManager");

const productManager = new ProductManager("./src/data/products.json");
// Load products from json file
productManager.getProducts().then(() => {});

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async saveCarts() {
    const cartsJSON = JSON.stringify(this.carts, null, 2);
    await fs.promises.writeFile(this.path, cartsJSON);
  }

  async validateCart(cart) {
    if (cart?.products?.length === 0) throw new Error("Products is required");
    for (const product of cart.products) {
      if (!product.id) throw new Error("Product id is required");
      if (product.quantity <= 0) throw new Error("Product quantity must be greater than 0");
      const productFound = await productManager.getProductById(product.id);
      if (!productFound) throw new Error(`Product with id ${product.id} not found`);
    }
  }

  async addCart(products) {
    const newCart = {
      id: this.carts.length + 1,
      products,
    };
    await this.validateCart(newCart);
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }
}

module.exports = CartManager;
