document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo các thành phần từ admin.js
    if (typeof navigateTo === 'function') {
        navigateTo('dashboard');
    }

    // Khởi tạo các thành phần từ quanlinguoidung.js
    if (typeof loadUsers === 'function') {
        loadUsers();
        document.getElementById("editUserModal").style.display = "none";
    }

    // Khởi tạo các thành phần từ trangsanpham.js (nếu có)
    if (typeof initProductManagement === 'function') {
        initProductManagement();
    }

    if (typeof navigateTo_giohang === 'function') {
        // Điều hướng đến giỏ hàng, ví dụ là "tất cả đơn hàng"
        navigateTo_giohang('tatcadonhang');
    }

    if (typeof animateValue === 'function'){
        animateValue
    }


});
