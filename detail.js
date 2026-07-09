const API_URL = "https://6a40e6851ff1d27becc10f20.mockapi.io/products";
// Lấy id từ URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
// Lấy sản phẩm theo id
fetch(API_URL + "/" + id)
    .then(res => res.json())
    .then(product => {
        document.getElementById("image").src = product.image;
        document.getElementById("name").innerText = product.name;
        document.getElementById("price").innerText =
            Number(product.price).toLocaleString() + " VNĐ";
        document.getElementById("category").innerText = product.category;
        document.getElementById("description").innerText = product.description;
        document.getElementById("stock").innerText = product.stock;

    });