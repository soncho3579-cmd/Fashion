const API_URL = "https://6a40e6851ff1d27becc10f20.mockapi.io/products";
let danhSachSanPham = [];
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        danhSachSanPham = data;
        hienThiSanPham(danhSachSanPham);
        taoDanhMuc(danhSachSanPham);
    })
    .catch(error => {
        console.log(error);
    });
function taoDanhMuc(products) {
    const categorySelect = document.getElementById("category");
    const danhMuc = [...new Set(products.map(product => product.category))];
    danhMuc.forEach(muc => {
        const option = document.createElement("option");
        option.value = muc;
        option.textContent = muc;
        categorySelect.appendChild(option);
    });
}
function hienThiSanPham(products) {
    const productList = document.getElementById("product-list");
    let html = "";
    products.forEach(product => {
    html += `
        <div class="col-lg-3 col-md-6">
         <div class="card h-100">
        <img src="${product.image}" class="card-img-top">
        <div class="card-body">
            <h5>${product.name}</h5>
            <p class="text-danger fw-bold">
                ${Number(product.price).toLocaleString()} VNĐ
            </p>
            <a href="detail.html?id=${product.id}" class="btn btn-dark w-100">
                 Xem chi tiết
            </a>
        </div>
    </div>
</div>

`;
    });

    productList.innerHTML = html;
}
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function () {
    const tuKhoa = this.value.toLowerCase();
    const ketQua = danhSachSanPham.filter(product =>
        product.name.toLowerCase().includes(tuKhoa)
    );
    hienThiSanPham(ketQua);
});
const categorySelect = document.getElementById("category");
categorySelect.addEventListener("change", function () {
    const value = this.value;
    if (value === "all") {
        hienThiSanPham(danhSachSanPham);
        return;
    }
    const ketQua = danhSachSanPham.filter(product =>
        product.category === value
    );
    hienThiSanPham(ketQua);
});