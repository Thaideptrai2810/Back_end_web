function navigateTo_giohang(sectionId) {
    // Ẩn tất cả các phần nội dung
    const sections = document.querySelectorAll('.content_contentgiohang_section');
    sections.forEach(section => {
        section.classList.remove('active_giohang');
    });

    // Hiển thị phần nội dung tương ứng
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active_giohang');
    }

    // Cập nhật trạng thái của các mục trong menu
    const menuItems = document.querySelectorAll('.menu_headergiohang');
    menuItems.forEach(item => {
        item.classList.remove('active_giohang');
    });

    // Đánh dấu mục đang hoạt động trong menu
    const activeItem = document.querySelector(`.menu_headergiohang[onclick*="${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active_giohang');
    }

    // Ghi lại điều hướng (chỉ để kiểm tra)
    console.log(`Navigated to: ${sectionId}`);
}

// Mặc định hiển thị trang "tất cả đơn hàng" khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    navigateTo_giohang('tatcadonhang');
});


document.getElementById('search-button').addEventListener('click', function () {
    const searchValue = document.getElementById('search-input').value;
    console.log('Tìm kiếm:', searchValue);
});

document.addEventListener('DOMContentLoaded', () => {
    navigateTo_giohang('tatcadonhang');
});





// Hiển thị/ẩn dropdown khi nhấn vào nút "Thêm điều kiện lọc"
document.querySelector('.left_search_contentgiohang').addEventListener('click', function() {
    const dropdown = document.getElementById('filter-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Ẩn dropdown nếu nhấn ra ngoài vùng dropdown
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('filter-dropdown');
    const filterButton = document.querySelector('.left_search_contentgiohang');
    
    if (!dropdown.contains(event.target) && event.target !== filterButton) {
        dropdown.style.display = 'none';
    }
});







// Kiểm tra sự kiện click của nút "Lọc"
document.getElementById('filter-button').addEventListener('click', function() {
    console.log('Filter button clicked');
    filterOrders();
});

// Kiểm tra sự kiện click của nút "Xóa điều kiện lọc"
document.getElementById('clear-filters-button').addEventListener('click', function() {
    console.log('Clear filters button clicked');
    // Reset tất cả các trường lọc về giá trị mặc định
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    document.getElementById('order-status').value = '';
    document.getElementById('district-filter').value = '';

    // Reset lại bảng đơn hàng
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.style.display = ''; // Hiển thị tất cả các đơn hàng
    });

    // Đóng dropdown sau khi clear
    document.getElementById('filter-dropdown').style.display = 'none';
});




function showProductDetails(orderId) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none'); // Đảm bảo ẩn tất cả các modal trước
    const modal = document.getElementById(`product-details-${orderId}`);
    if (modal) {
        modal.style.display = 'block';
    }
}   

function closeProductDetails(orderId) {
    const modal = document.getElementById(`product-details-${orderId}`);
    if (modal) {
        modal.style.display = 'none';
    }
}



