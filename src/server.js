const express = require("express");
const handlebars = require("express-handlebars");
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// Setting the engine template Handlebars
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
// To use the engine template Handlebars
app.set("view engine", ".hbs");
// Setting the views directory
app.set("views", __dirname + "/views");

const { Server } = require("socket.io");

// The port number 8080 is assigned to the constant PORT.
const PORT = 8080;

// http://localhost:8080/
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/views", viewsRouter);

// listen for requests on the port
const serverHttp = app.listen(PORT, () => {
  console.log(`Server listening on port http:/localhost:${PORT}`);
});
const socketServer = new Server(serverHttp);
// From: https://stackoverflow.com/questions/47249009/nodejs-socket-io-in-a-router-page
app.set("socketio", socketServer);
socketServer.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
