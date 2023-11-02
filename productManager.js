class ProductManager {
  constructor() {
    this.products = [];
  }

  validateProduct = ({ title, description, price, thumbnail, code, stock }) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Missing properties");
    }

    const existingProduct = this.products.find((product) => product.code === code);
    if (existingProduct) {
      throw new Error("Product with code already exists");
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.validateProduct(newProduct);

    this.products.push(newProduct);
    return newProduct;
  };

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}
module.exports = ProductManager;
