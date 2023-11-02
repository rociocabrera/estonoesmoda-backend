const ProductManager = require("./productManager");

// Instance new class
const productManager = new ProductManager();

//Call to getProducts and return empty array
console.log({ products: productManager.getProducts() });

//Call addProduct with product data
productManager.addProduct("Black Shirt", "A classic black shirt is a wardrobe staple, and this one is no exception. Featuring a flattering fit and a timeless design, this shirt is perfect for any occasion.r", 3000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fblack-shirt.jpg?alt=media&token=d9694583-cdad-4e01-a6a9-cedad9127ae4&_gl=1*l4f6qh*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTkwMS42MC4wLjA.", "BS", 8);
productManager.addProduct("Square Dress", "Step into timeless elegance with this vintage-inspired grey dress, perfect for special occasions and garden parties.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fdressgreysquare.webp?alt=media&token=e157a218-6e9f-4ac6-ab3a-10c555393cbe&_gl=1*e8tva*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MjA1MS40NC4wLjA.", "SD", 2);

//Call to getProducts should have the new product
console.log({ productsAfterInsert: productManager.getProducts() });

// If PROPERTIES are missing, throw error
try {
  productManager.addProduct("", "Your new go-to pair of premium denim jeans, offering a comfortable and flattering fit for versatile, stylish looks.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fbluejeans.jpg?alt=media&token=2de6980f-9dd1-454b-9d4d-cd099e31df8b&_gl=1*nzokzp*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTk4MC41NS4wLjA.", "BJ", 3);
} catch (error) {
  console.log({ error: error.message });
}

// If product with CODE already exists, throw error
try {
  productManager.addProduct("Blue Jeans", "Your new go-to pair of premium denim jeans, offering a comfortable and flattering fit for versatile, stylish looks.", 5000, "https://firebasestorage.googleapis.com/v0/b/estonoesmoda-34be0.appspot.com/o/products%2Fbluejeans.jpg?alt=media&token=2de6980f-9dd1-454b-9d4d-cd099e31df8b&_gl=1*nzokzp*_ga*NTYwODIwNDQyLjE2OTY4OTkwODY.*_ga_CW55HF8NVT*MTY5Njk4NTUwNy41LjEuMTY5Njk5MTk4MC41NS4wLjA.", "SD", 3);
} catch (error) {
  console.log({ error: error.message });
}

// Call to getProductById with an ID that does not exist, throw error
try {
  productManager.getProductById(10);
} catch (error) {
  console.log({ error: error.message });
}

// Call to getProductById with an ID that exists, return product
console.log({ specificProduct: productManager.getProductById(1) });
