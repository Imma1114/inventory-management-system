let products = JSON.parse(localStorage.getItem("products")) || [];

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

function displayProducts() {
    productList.innerHTML = "";

    products.forEach((product, index) => {
        let row = document.createElement("tr");

        let stockClass = product.quantity < 5 ? "low-stock" : "";

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td class="${stockClass}">${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;

        productList.appendChild(row);
    });

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("totalProducts").textContent = products.length;

    let lowStockCount = products.filter(p => p.quantity < 5).length;
    document.getElementById("lowStock").textContent = lowStockCount;
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let category = document.getElementById("category").value;
    let quantity = document.getElementById("quantity").value;

    products.push({ name, category, quantity });

    form.reset();
    displayProducts();
});

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function editProduct(index) {
    let newQuantity = prompt("Enter new quantity:");
    if (newQuantity !== null && newQuantity !== "") {
        products[index].quantity = parseInt(newQuantity);
        displayProducts();
    }
}

function searchProduct() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#productList tr");

    rows.forEach(row => {
        let productName = row.children[0].textContent.toLowerCase();
        row.style.display = productName.includes(searchValue) ? "" : "none";
    });
}

displayProducts();