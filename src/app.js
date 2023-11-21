const express = require("express");
const ProductManager = require("./productManager");

const app = express();
// The port number 8080 is assigned to the constant PORT.
const PORT = 8080;

app.get("/", (req, res) => {
  res.status(201).send("Welcome to Esto no es Moda!");
});

// The ProductManager class is instantiated with the path to the products.json file.
const productManager = new ProductManager("./src/products.json");

app.get("/products", async (req, res) => {
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

// The app.get() method is used to define a route handler for the GET HTTP method to the path /products/:pid.
app.get("/products/:pid", async (req, res) => {
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

// listen for requests on the port
app.listen(PORT, () => {
  console.log(`Server listening on port http:/localhost:${PORT}`);
});
