const express = require("express");
const handlebars = require("express-handlebars");
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting the engine template Handlebars
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
// To use the engine template Handlebars
app.set("view engine", ".hbs");
// Setting the views directory
app.set("views", __dirname + "/views");

// Setting the static files directory
app.get("/views", (req, res) => {
  res.render("products", { title: "Clothing Store", name: "User" });
});

// The port number 8080 is assigned to the constant PORT.
const PORT = 8080;

// http://localhost:8080/
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// listen for requests on the port
app.listen(PORT, () => {
  console.log(`Server listening on port http:/localhost:${PORT}`);
});
