const express = require("express");
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The port number 8080 is assigned to the constant PORT.
const PORT = 8080;

// http://localhost:8080/
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// listen for requests on the port
app.listen(PORT, () => {
  console.log(`Server listening on port http:/localhost:${PORT}`);
});
