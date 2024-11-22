






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




const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');


// Hàm mở/đóng sidebar khi nhấn vào menu icon
menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    toggleSidebar();
});

// Hàm để mở/đóng sidebar và xoay icon
function toggleSidebar() {
    sidebar.classList.toggle('open'); // Mở/đóng sidebar
    menuIcon.classList.toggle('rotate'); // Xoay icon
}

// Đóng sidebar nếu nhấn ra ngoài sidebar
document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        closeSidebar();
    }
});

// Hàm đóng sidebar và reset icon
function closeSidebar() {
    sidebar.classList.remove('open');
    menuIcon.classList.remove('rotate');
}



// Xử lý đăng xuất
document.getElementById("logoutadmin").addEventListener("click", function() {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("user");

    // Chuyển hướng về trang login
    window.location.href = "login.html"; // Thay đổi với đường dẫn của trang đăng nhập
});


// Xử lý đăng xuất
document.getElementById("logoutAdmin").addEventListener("click", function() {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem("user");

    // Chuyển hướng về trang login
    window.location.href = "login.html"; // Thay đổi với đường dẫn của trang đăng nhập
});

