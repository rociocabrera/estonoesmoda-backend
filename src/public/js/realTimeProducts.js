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

const addProduct = () => {
  const title = document.getElementById("title").value;
  console.log(title);
  const description = document.getElementById("description").value;
  console.log(description);
  const price = document.getElementById("price").value;
  console.log(price);
  const thumbnails = [document.getElementById("thumbnail").value];
  console.log(thumbnails);
  const code = document.getElementById("code").value;
  console.log(code);
  const stock = document.getElementById("stock").value;
  const status = document.getElementById("status").checked;
  const category = document.getElementById("category").value;
  const product = {
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category,
  };
  console.log(product);
  // call POST/api/products endpoint with the product object
  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.status === "error") {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
