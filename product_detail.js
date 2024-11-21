// Định dạng giá VND
function vnd(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Hàm khởi tạo preview sản phẩm
function initializeProductPreview(product) {
    const ftImg = product.querySelectorAll(".feature_images img");
    const mainImg = product.querySelector(".main_image img");

    // Gắn sự kiện click cho ảnh feature
    ftImg.forEach(img => {
        img.addEventListener("click", () => {
            mainImg.src = img.src; // Cập nhật ảnh chính

            // Loại bỏ lớp 'selected' khỏi tất cả ảnh feature
            ftImg.forEach(img => img.classList.remove('selected'));

            // Thêm lớp 'selected' cho ảnh được nhấp
            img.classList.add('selected');
        });
    });

    // Mặc định click vào ảnh đầu tiên
    const firstFeatureImage = product.querySelector(".feature_images img");
    if (firstFeatureImage) {
        firstFeatureImage.click();
    }
}

// Hàm khởi tạo model
function initializeModelSelection(modelButtons, modelName) {
    // Gắn sự kiện click cho các nút model
    modelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Bỏ class 'selected' khỏi tất cả các nút
            modelButtons.forEach(btn => btn.classList.remove('selected'));

            // Thêm class 'selected' vào nút được nhấp
            button.classList.add('selected');

            // Cập nhật tên model được chọn
            modelName.innerText = button.innerText;
        });
    });

    // Mặc định click vào nút "Soft Case"
    const firstClickedBtn = document.querySelector('[data-model]');
    if (firstClickedBtn) {
        firstClickedBtn.click();
    }
}





