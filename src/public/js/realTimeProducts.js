const socket = io();

socket.on("update-products", (data) => {
  const productsList = document.getElementById("products");
  productsList.innerHTML = "";
  data.forEach((product) => {
    productsList.innerHTML += `
        <li>
        ${product.title}
        </li>
        `;
  });
});
