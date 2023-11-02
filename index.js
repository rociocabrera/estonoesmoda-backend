class ProductManager {
  constructor() {
    this.products = [];
  }

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
    this.products.push(newProduct);
    return newProduct;
  };

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Not found");
    }
    return product;
  }
}

const productManager = new ProductManager();

console.log({ products: productManager.getProducts() });

productManager.addProduct("Black Shirt", "A classic black shirt is a wardrobe staple, and this one is no exception. Featuring a flattering fit and a timeless design, this shirt is perfect for any occasion.r", 3000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fblack-shirt.jpg?alt=media&token=d9694583-cdad-4e01-a6a9-cedad9127ae4&_gl=1*l4f6qh*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTkwMS42MC4wLjA.", "BS", 8);
productManager.addProduct("Square Dress", "Step into timeless elegance with this vintage-inspired grey dress, perfect for special occasions and garden parties.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fdressgreysquare.webp?alt=media&token=e157a218-6e9f-4ac6-ab3a-10c555393cbe&_gl=1*e8tva*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MjA1MS40NC4wLjA.", "SD", 2);
productManager.addProduct("Blue Jean", "Your new go-to pair of premium denim jeans, offering a comfortable and flattering fit for versatile, stylish looks.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fbluejeans.jpg?alt=media&token=2de6980f-9dd1-454b-9d4d-cd099e31df8b&_gl=1*nzokzp*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTk4MC41NS4wLjA.", "BJ", 3);

console.log({ productsAfterInsert: productManager.getProducts() });

console.log({ specificProduct: productManager.getProductById(1) });
