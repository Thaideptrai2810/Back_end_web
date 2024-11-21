 
function showAddProductForm(){
    document.getElementById("productListSection").classList.add("hidden");
    document.getElementById("addProductSection").classList.remove("hidden");
}
function showProductList () {
    document.getElementById("addProductSection").classList.add("hidden");
    document.getElementById("productListSection").classList.remove("hidden");
    clearInputFields();

}

function clearInputFields() {
    // Lấy tất cả các trường nhập liệu trong phần thêm sản phẩm
    document.getElementById("productName").value = "";
    document.getElementById("case").value = "";
    document.getElementById("productBrand").value = "";
    document.getElementById("productModel").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productDescription").value = "";

    // Xóa tệp hình ảnh đã chọn
    const fileInput = document.getElementById("productImage");
    fileInput.value = "";

    // Ẩn ảnh xem trước (nếu có)
    const imagePreview = document.getElementById("imagePreview");
    if (imagePreview) {
        imagePreview.src = "";
        imagePreview.style.display = "none";
    }
}

function displayProducts() {

    // Lưu sản phẩm vào localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Lấy sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    const productTable = document.querySelector("table");

    // Xóa các hàng sản phẩm cũ để làm mới bảng
    productTable.querySelectorAll("tr.product-row").forEach(row => row.remove());

    products.forEach(product => {
        const row = document.createElement("tr");
        row.classList.add("product-row");

        let imageContent = "";
            if (product.image) {
                imageContent = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: auto;">`;
            } else {
                imageContent = `<span style="color: red;">Chưa cập nhật ảnh</span>`;
            }

        // Tạo nội dung cho mỗi ô trong hàng
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.caseType}</td>
            <td>${product.name}</td>
            <td>${product.model}</td>
            <td>${imageContent}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.quantity}</td>
            <td>
                <div class="icon-button">
                    <i class="fa-solid fa-trash-can icon trash-icon" onclick="showDeleteConfirm('${product.id}')"></i>
                </div>
                <div class="icon-button">
                    <i class="fa-solid fa-pen-to-square icon edit-icon"  onclick="showEditProductForm('${product.id}')"></i>
                </div>
            </td>
        `;

        productTable.appendChild(row);
    });
}function displayProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productTable = document.querySelector("table");

    // Xóa các hàng sản phẩm cũ để làm mới bảng
    productTable.querySelectorAll("tr.product-row").forEach(row => row.remove());

    // Hiển thị sản phẩm từ localStorage
    products.forEach(product => {
        const row = document.createElement("tr");
        row.classList.add("product-row");

        let imageContent = "";
        if (product.image) {
            imageContent = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: auto;">`;
        } else {
            imageContent = `<span style="color: red;">Chưa cập nhật ảnh</span>`;
        }

        // Tạo nội dung cho mỗi ô trong hàng
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.caseType}</td>
            <td>${product.name}</td>
            <td>${product.model}</td>
            <td>${imageContent}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.quantity}</td>
            <td>
                <div class="icon-button">
                    <i class="fa-solid fa-trash-can icon trash-icon" onclick="showDeleteConfirm('${product.id}')"></i>
                </div>
                <div class="icon-button">
                    <i class="fa-solid fa-pen-to-square icon edit-icon" onclick="showEditProductForm('${product.id}')"></i>
                </div>
            </td>
        `;

        productTable.appendChild(row);
    });
}

function displayFilename(){
    const fileInput = document.getElementById("productImage");
    const fileName = fileInput.files[0] ? fileInput.files[0].name : "Chua chon file";
    document.getElementById("fileNameDisplay").textContent = fileName;
}
document.getElementById("productImage").addEventListener('change', displayFilename);

function formatCurrency(price) {
    // Kiểm tra nếu giá là một số hợp lệ
    if (isNaN(price) || price < 0) {
        return "0 VND";
    }

    // Định dạng giá theo dạng VND (thêm dấu phân cách hàng nghìn)
    let formattedPrice = parseFloat(price).toLocaleString('vi-VN');

    // Thêm đơn vị VND vào cuối
    return formattedPrice + '₫';
}
function saveProducts(){
    const productCase = document.getElementById("case").value;
    const productName = document.getElementById("productName").value;
    const productBrand = document.getElementById("productBrand").value;
    const productPrice = document.getElementById("productPrice").value;
    const productQuantity = document.getElementById("productQuantity").value;
    const productDescription = document.getElementById("productDescription").value;
    const productModel = document.getElementById("productModel").value;
    const fileInput = document.getElementById("productImage");

    if (!productCase) {
        alert("Dòng ốp lưng không được để trống!");
        document.getElementById("case").focus();
        return;
    }

    if (!productName) {
        alert("Tên ốp lưng không được để trống!");
        document.getElementById("productName").focus();
        return;
    }

    if (!productBrand) {
        alert("Thương hiệu không được để trống!");
        document.getElementById("productBrand").focus();
        return;
    }

    if (!productModel) {
        alert("Mẫu điện thoại không được để trống!");
        document.getElementById("productModel").focus();
        return;
    }

    if (!productPrice) {
        alert("Giá bán không được để trống!");
        document.getElementById("productPrice").focus();
        return;
    }

    if (!productQuantity) {
        alert("Số lượng không được để trống!");
        document.getElementById("productQuantity").focus();
        return;
    }

    if (!productDescription) {
        alert("Mô tả sản phẩm không được để trống!");
        document.getElementById("productDescription").focus();
        return;
    }

    if (fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const productImagePath = e.target.result; // Base64 string
        const brandCode = { "Apple": "ip", "Samsung": "sm" };
        const code = brandCode[productBrand];
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const id = products.length + 1;
        const productID = code + "-" + id;

        storeProductData(
            productCase,
            productName,
            productBrand,
            productModel,
            productPrice,
            productQuantity,
            productDescription,
            productImagePath, // Base64 image
            productID
        );
    };
    reader.readAsDataURL(fileInput.files[0]); // Chuyển ảnh thành Base64
} else {
    alert("Vui lòng chọn ảnh sản phẩm!");
    document.getElementById("productImage").focus();
    return;
}

}

function storeProductData(productCase, productName, productBrand, productModel, productPrice, productQuantity, productDescription, productImagePath, productID) {
    const newProduct = {
        id: productID,
        name: productName,
        caseType: productCase,
        brand: productBrand,
        model: productModel,
        image: productImagePath,
        price: productPrice,
        quantity: parseInt(productQuantity),
        sold: 0,
        totalRevenue: 0,
        description: productDescription,
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);  // Thêm sản phẩm mới vào danh sách
    localStorage.setItem("products", JSON.stringify(products));  // Lưu lại vào localStorage

    // Reset form
    clearInputFields();
    alert("Thêm sản phẩm thành công!");
    displayProducts();  // Hiển thị lại danh sách sản phẩm
    showProductList();  // Quay lại danh sách sản phẩm
}


let productToDelete = null;
let productToEdit = null;

function showDeleteConfirm(productID) {
productToDelete = productID;
document.getElementById("deleteConfirmBox").style.display = "block";
}

function closeDeleteConfirm() {
document.getElementById("deleteConfirmBox").style.display = "none";
}

function confirmDelete() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    // Lọc các sản phẩm không trùng với sản phẩm cần xóa
    products = products.filter(product => product.id !== productToDelete);
    localStorage.setItem("products", JSON.stringify(products));  // Lưu lại vào localStorage
    displayProducts();  // Hiển thị lại danh sách sản phẩm
    closeDeleteConfirm(); // Đóng hộp xác nhận
}


function showEditProductForm(productID) {
productToEdit = productID;
const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find(product => product.id === productID);

if (product) {
    // Điền thông tin sản phẩm vào form chỉnh sửa
    document.getElementById("editProductName").value = product.name;
    document.getElementById("editProductCase").value = product.caseType;
    document.getElementById("editProductBrand").value = product.brand;
    document.getElementById("editProductModel").value = product.model;
    document.getElementById("editProductPrice").value = product.price;
    document.getElementById("editProductQuantity").value = product.quantity;
    document.getElementById("editProductDescription").value = product.description;

    // Hiển thị ảnh sản phẩm hiện tại
    if (product.image) {
        document.getElementById("editImagePreview").src = product.image;
        document.getElementById("editImagePreview").style.display = "block";
        document.getElementById("deleteEditImageButton").style.display = "inline-block";
    }
}

document.getElementById("editProductBox").style.display = "block";
}


function saveEditedProduct() {
    const productCase = document.getElementById("editProductCase").value;
    const productName = document.getElementById("editProductName").value;
    const productBrand = document.getElementById("editProductBrand").value;
    const productModel = document.getElementById("editProductModel").value;
    const productPrice = document.getElementById("editProductPrice").value;
    const productQuantity = document.getElementById("editProductQuantity").value;
    const productDescription = document.getElementById("editProductDescription").value;
    const editProductImage = document.getElementById("editProductImage");

    if (!productCase || !productBrand || !productModel || !productPrice || !productQuantity || !productDescription) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
        return;
    }

    // Tạo mã thương hiệu
    const brandCodes = {
        "Apple": "ip",
        "Samsung": "sm",
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    const index = products.findIndex(product => product.id === productToEdit);

    if (index !== -1) {
        const updatedProduct = {
            ...products[index],
            caseType: productCase,
            name: productName,
            brand: productBrand,
            model: productModel,
            price: productPrice,
            quantity: productQuantity,
            description: productDescription
        };

        // Cập nhật mã sản phẩm nếu thương hiệu thay đổi
        const originalID = products[index].id;
        const originalNumber = originalID.split("-")[1];
        // Giữ nguyên số thứ tự ban đầu
        updatedProduct.id = `${brandCodes[productBrand]}-${originalNumber}`;

        // Cập nhật ảnh nếu có tệp mới hoặc ảnh bị xóa
        if (editProductImage.files[0]) {
            updatedProduct.image = `img/product/Case/${editProductImage.files[0].name}`;
        } else if (document.getElementById("editImagePreview").style.display === "none") {
            updatedProduct.image = "";
        }

        products[index] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
        closeEditProduct();
    }
    }


    function previewEditImage() {
    const editProductImage = document.getElementById("editProductImage").files[0];
    const editImagePreview = document.getElementById("editImagePreview");

    if (editProductImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            editImagePreview.src = e.target.result;
            editImagePreview.style.display = "block";
            document.getElementById("deleteEditImageButton").style.display = "inline-block";
        };
        reader.readAsDataURL(editProductImage);
    }
}
function deleteEditImage() {
document.getElementById("editImagePreview").src = "";
document.getElementById("editImagePreview").style.display = "none";
document.getElementById("editProductImage").value = ""; // Xóa ảnh đã chọn
document.getElementById("deleteEditImageButton").style.display = "none";
}
function closeEditProduct() {
document.getElementById("editProductBox").style.display = "none";
}
window.addEventListener("load", function() {
    displayProducts();
});
