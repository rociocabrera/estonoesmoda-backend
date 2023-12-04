const socket = io();

socket.on("update-products", (data) => {
  console.log(data);
});

