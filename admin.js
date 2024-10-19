function toggleDropdown(event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên phần tử cha
    const dropdown = event.currentTarget;
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const overlay = document.getElementById('overlay');

    // Ẩn tất cả dropdown khác
    document.querySelectorAll('.dropdown-content').forEach(content => {
        content.classList.remove('show');
    });

    // Chuyển đổi trạng thái hiển thị của dropdown
    const isVisible = dropdownContent.classList.contains('show');
    dropdownContent.classList.toggle('show', !isVisible);
    overlay.style.display = isVisible ? 'none' : 'block'; // Hiển thị overlay
}

// Đóng dropdown khi click bên ngoài
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-content').forEach(content => {
        content.classList.remove('show');
    });
    document.getElementById('overlay').style.display = 'none'; // Ẩn overlay
});

// Hàm điều hướng đến các phần nội dung
function navigateTo(sectionId) {
    // Ẩn tất cả các phần nội dung
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Hiển thị phần nội dung tương ứng
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Cập nhật trạng thái của sidebar
    const menuItems = document.querySelectorAll('.trangtongquan');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Đánh dấu mục đang hoạt động trong sidebar
    const activeItem = document.querySelector(`.trangtongquan[onclick*="${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // Ghi lại điều hướng
    console.log(`Navigated to: ${sectionId}`);
}

// Mặc định hiển thị trang tổng quan khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('dashboard');
});
