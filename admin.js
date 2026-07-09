const API_URL = "https://6a40e6851ff1d27becc10f20.mockapi.io/products";
let editId = null;
let allProducts = [];
function loadProducts() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            hienThiAdmin(data);
        });
}

loadProducts();
function hienThiAdmin(products) {

    const adminList = document.getElementById("admin-list");

    let html = "";

    products.forEach(product => {
        html += `
<div class="card mb-3">
    <div class="card-body">

        <img src="${product.image}" width="120" class="mb-3">

        <h5>${product.name}</h5>

        <p><b>Giá:</b> ${Number(product.price).toLocaleString()} VNĐ</p>

        <p><b>Danh mục:</b> ${product.category}</p>

        <p><b>Mô tả:</b> ${product.description}</p>

        <p><b>Tồn kho:</b> ${product.stock}</p>

        <button onclick="sua('${product.id}')" class="btn btn-warning">
            Sửa
        </button>

        <button onclick="xoa('${product.id}')" class="btn btn-danger">
            Xóa
        </button>

    </div>
</div>
`;

    });

    adminList.innerHTML = html;
}
document.getElementById("btnAdd").onclick = function () {

    const product = {
        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value,
        image: document.getElementById("image").value,
        description: document.getElementById("description").value,
        stock: Number(document.getElementById("stock").value)
    };
    if (
    product.name.trim() === "" ||
    product.category.trim() === "" ||
    product.image.trim() === "" ||
    product.description.trim() === ""
) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
}
if (product.price <= 0) {
    alert("Giá sản phẩm phải lớn hơn 0!");
    return;
}
if (product.stock < 0) {
    alert("Tồn kho không được nhỏ hơn 0!");
    return;
}

    if (editId == null) {

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(() => {
    alert("Thêm thành công!");

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
    document.getElementById("stock").value = "";

    loadProducts();
});
        }        
        else {

        fetch(API_URL + "/" + editId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(() => {
            alert("Cập nhật thành công!");

            editId = null;

            document.getElementById("btnAdd").innerText = "Thêm sản phẩm";

            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("category").value = "";
            document.getElementById("image").value = "";
            document.getElementById("description").value = "";
            document.getElementById("stock").value = "";

            loadProducts();
        });

    }

};

function xoa(id){
    if(!confirm("Bạn chắc chắn muốn xóa?")) return;

    fetch(API_URL+"/"+id,{

        method:"DELETE"

    })

    .then(()=>{

        loadProducts();

    });

}
function sua(id){

    fetch(API_URL + "/" + id)
    .then(res => res.json())
    .then(product => {

        editId = id;

        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("category").value = product.category;
        document.getElementById("image").value = product.image;
        document.getElementById("description").value = product.description;
        document.getElementById("stock").value = product.stock;

        document.getElementById("btnAdd").innerText = "Cập nhật sản phẩm";

    });
    document.getElementById("search").addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const result = allProducts.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    hienThiAdmin(result);

});
}