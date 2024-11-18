 // Hàm để hiển thị danh sách người dùng từ Local Storage
        // Hàm để hiển thị danh sách người dùng từ Local Storage
        function loadUsers() {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userTable = document.querySelector('table tbody');

            // Xóa nội dung hiện có trong bảng
            userTable.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.address}</td>
                    <td>${user.spending}</td>
                    <td>
                        <div class="tinhnang">
                            <div class="icon" onclick="toggleUserStatus(${user.id}, this)">
                                <i class="fa-solid ${user.status === 'unlocked' ? 'fa-lock-open' : 'fa-lock'}"></i>
                            </div>
                            <div class="icon" onclick="editUser(${user.id})">
                                <i class="fa-solid fa-user-pen"></i>
                            </div>
                        </div>
                    </td>
                `;
                userTable.appendChild(row);
            });
        }

        // Hàm khóa/mở khóa người dùng và thay đổi biểu tượng
        function toggleUserStatus(userId, iconElement) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.id === userId);
            
            if (user) {
                user.status = user.status === 'unlocked' ? 'locked' : 'unlocked';
                localStorage.setItem('users', JSON.stringify(users));
                
                // Cập nhật biểu tượng khóa/mở khóa ngay lập tức
                const icon = iconElement.querySelector('i');
                if (user.status === 'locked') {
                    icon.classList.remove('fa-lock-open');
                    icon.classList.add('fa-lock');
                } else {
                    icon.classList.remove('fa-lock');
                    icon.classList.add('fa-lock-open');
                }
            }
        }

        // Gọi loadUsers khi trang quản lý người dùng tải
        window.onload = loadUsers;
    // Hàm hiển thị form chỉnh sửa người dùng
    let currentUserId = null;

    function editUser(userId) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === userId);

        if (user) {
            // Lưu ID người dùng hiện tại
            currentUserId = userId;

            // Hiển thị thông tin người dùng trong form
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editPhone").value = user.phone || '';
            document.getElementById("editAddress").value = user.address || '';

            // Hiển thị hộp thoại
            document.getElementById("editUserModal").style.display = "flex";
        }
    }

    function closeEditUserModal() {
        document.getElementById("editUserModal").style.display = "none";
    }
    window.onload = function() {
        loadUsers();  // Tải danh sách người dùng
        // Đảm bảo hộp thoại chỉnh sửa không hiển thị khi tải trang
        document.getElementById("editUserModal").style.display = "none";
    };

    function saveUserChanges() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === currentUserId);

        if (user) {
            user.email = document.getElementById("editEmail").value;
            user.phone = document.getElementById("editPhone").value;
            user.address = document.getElementById("editAddress").value;

            // Cập nhật vào Local Storage và đóng hộp thoại
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
            closeEditUserModal();
        }
    }

