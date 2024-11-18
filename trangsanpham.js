
        function showAddProductForm(){
            document.getElementById("productListSection").classList.add("hidden");
            document.getElementById("addProductSection").classList.remove("hidden");
        }

      



        function showProductList () {
            document.getElementById("addProductSection").classList.add("hidden");
            document.getElementById("productListSection").classList.remove("hidden");
        }
        window.onload = function() {
        // Hiển thị lại sản phẩm từ localStorage khi trang được tải lại
        displayProducts();
        };
        function displayProducts() {
            const products = JSON.parse(localStorage.getItem("products")) || [];
            const productTable = document.querySelector("table");
    
            // Xóa các hàng sản phẩm cũ để làm mới bảng
            productTable.querySelectorAll("tr.product-row").forEach(row => row.remove());
    
            products.forEach(product => {
                const row = document.createElement("tr");
                row.classList.add("product-row");
            
                // Tạo các ô (td) cho mỗi hàng
                const idCell = document.createElement("td");
                idCell.textContent = product.id;
            
                const nameCell = document.createElement("td");
                nameCell.textContent = product.name;
            
                const imageCell = document.createElement("td");
                const img = document.createElement("img");
                img.src = product.image;
                img.alt = product.name;
                img.style.width = "50px";
                img.style.height = "auto";
                imageCell.appendChild(img);
            
                const priceCell = document.createElement("td");
                priceCell.textContent = product.price;
            
                const quantityCell = document.createElement("td");
                quantityCell.textContent = product.quantity;
            
                const actionCell = document.createElement("td");
            
                // Nút xóa
                const deleteButton = document.createElement("i");
                deleteButton.classList.add("fa-solid", "fa-trash-can", "icon", "trash-icon");
                deleteButton.onclick = () => showDeleteConfirm(product.id);
            
                // Nút chỉnh sửa
                const editButton = document.createElement("i");
                editButton.classList.add("fa-solid", "fa-pen-to-square", "icon", "edit-icon");
                editButton.onclick = () => showEditProductForm(product.id);
            
                // Thêm các nút vào ô hành động
                const deleteDiv = document.createElement("div");
                deleteDiv.classList.add("icon-button");
                deleteDiv.appendChild(deleteButton);
            
                const editDiv = document.createElement("div");
                editDiv.classList.add("icon-button");
                editDiv.appendChild(editButton);
            
                actionCell.appendChild(deleteDiv);
                actionCell.appendChild(editDiv);
            
                // Thêm các ô vào hàng
                row.appendChild(idCell);
                row.appendChild(nameCell);
                row.appendChild(imageCell);
                row.appendChild(priceCell);
                row.appendChild(quantityCell);
                row.appendChild(actionCell);
            
                // Thêm hàng vào bảng
                productTable.appendChild(row);
            });
            
        }
        function showDeleteConfirm(productId) {
            if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm với ID ${productId}?`)) {
                console.log(`Đã xóa sản phẩm có ID: ${productId}`);
                // Thực hiện các bước để xóa sản phẩm ở đây
            }
        }
        
        function showEditProductForm(productId) {
            console.log(`Chỉnh sửa sản phẩm có ID: ${productId}`);
            // Hiển thị form chỉnh sửa hoặc điều hướng đến trang chỉnh sửa
        }

        
        
        function displayFilename(){
            const fileInput = document.getElementById("productImage");
            const fileName = fileInput.files[0] ? fileInput.files[0].name : "Chua chon file";
            document.getElementById("fileNameDisplay").textContent = fileName;
        }
        document.getElementById("productImage").addEventListener('change', displayFilename);

        function saveProducts(){
            const productName= document.getElementById("productName").value;
            const productBrand = document.getElementById("productBrand").value;
            const productPrice = document.getElementById("productPrice").value;
            const productQuantity = document.getElementById("productQuantity").value;
            const productDescription = document.getElementById("productDescription").value;
            const productModel = document.getElementById("productModel").value;
            const fileInput = document.getElementById("productImage");

            if (!productName) {
            alert("Tên sản phẩm không được để trống!");
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

        if (!fileInput.files[0]) {
            alert("Vui lòng chọn ảnh sản phẩm!");
            document.getElementById("productImage").focus();
            return;
        }
        const productImagePath = 'images/' + fileInput.files[0].name;
        const brandCode = { "Apple" : "ip", "Samsung": "sm", "Xiaomi": "xm","Oppo": "op", "Vivo": "vv"};
        const code = brandCode[productBrand];
        var products = JSON.parse(localStorage.getItem("products")) || [];
        var id = products.length + 1;
        var productID = code + "-" + id;
        storeProductData(productName, productBrand, productModel, productPrice, productQuantity, productDescription, productImagePath,productID);
    }

    function storeProductData(productName, productBrand, productModel, productPrice, productQuantity, productDescription, productImagePath,productID){
        const newProduct = {
            id: productID,
            name: productName,
            brand: productBrand,
            model: productModel,
            price: productPrice,
            quantity: productQuantity,
            description: productDescription,
            image: productImagePath,
            
        };
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        document.getElementById("productName").value = "";
        document.getElementById("productBrand").value = "";
        document.getElementById("productModel").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
        document.getElementById("productDescription").value = "";
        document.getElementById("productImage").value = "";
        document.getElementById("fileNameDisplay").textContent = "";
        alert("Thêm sản phẩm thành công!");
        displayProducts();
        showProductList ()
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
        // Xóa sản phẩm khỏi localStorage
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products = products.filter(product => product.id !== productToDelete);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();  // Cập nhật lại danh sách sản phẩm
        closeDeleteConfirm(); // Đóng hộp xác nhận
    }

    function showEditProductForm(productID) {
        productToEdit = productID;
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const product = products.find(product => product.id === productID);

        if (product) {
            // Điền thông tin sản phẩm vào form chỉnh sửa
            document.getElementById("editProductName").value = product.name;
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
        const productName = document.getElementById("editProductName").value;
        const productBrand = document.getElementById("editProductBrand").value;
        const productModel = document.getElementById("editProductModel").value;
        const productPrice = document.getElementById("editProductPrice").value;
        const productQuantity = document.getElementById("editProductQuantity").value;
        const productDescription = document.getElementById("editProductDescription").value;
        const editProductImage = document.getElementById("editProductImage");

        if (!productName || !productBrand || !productModel || !productPrice || !productQuantity || !productDescription) {
            alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
            return;
        }

        // Tạo mã thương hiệu
        const brandCodes = {
            "Apple": "ip",
            "Samsung": "sm",
            "Xiaomi": "xm",
            "Oppo": "op",
            "Vivo": "vv"
        };

        let products = JSON.parse(localStorage.getItem("products")) || [];
        const index = products.findIndex(product => product.id === productToEdit);

        if (index !== -1) {
            const updatedProduct = {
                ...products[index],
                name: productName,
                brand: productBrand,
                model: productModel,
                price: productPrice,
                quantity: productQuantity,
                description: productDescription
            };

            // Cập nhật mã sản phẩm nếu thương hiệu thay đổi
            const originalID = products[index].id;
            const originalNumber = originalID.split("-")[1]; // Giữ nguyên số thứ tự ban đầu
            updatedProduct.id = `${brandCodes[productBrand]}-${originalNumber}`;

            // Cập nhật ảnh nếu có tệp mới hoặc ảnh bị xóa
            if (editProductImage.files[0]) {
                updatedProduct.image = 'images/' + editProductImage.files[0].name;
            } else if (document.getElementById("editImagePreview").style.display === "none") {
                updatedProduct.image = ""; // Xóa ảnh nếu không còn hiển thị
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
    
   