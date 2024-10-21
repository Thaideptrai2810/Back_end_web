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
