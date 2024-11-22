    // Hàm để lấy danh sách người dùng từ localStorage
    function getUsersFromLocalStorage() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users;
    }

    // Hàm để lưu danh sách người dùng vào localStorage
    function saveUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Hàm để load danh sách người dùng từ Local Storage
    function loadUsers() {
        const users = getUsersFromLocalStorage(); // Lấy người dùng từ localStorage

        const userTable = document.querySelector("#userTable tbody");
        userTable.innerHTML = ''; // Xóa hết dữ liệu cũ trong bảng

        users.forEach(user => {
            // Kiểm tra số điện thoại và địa chỉ để hiển thị
            const phoneDisplay = user.phone || `<span style="color: red; font-style: italic;">Chưa cập nhật</span>`;
            const addressDisplay = user.address || `<span style="color: red; font-style: italic;">Chưa cập nhật</span>`;

            // Tạo một hàng mới cho người dùng
            const row = document.createElement("tr");
            row.classList.add("user-row");

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td>${phoneDisplay}</td>
                <td>${addressDisplay}</td>
                <td>${user.spending}</td>
                <td>
                    <div class="tinhnang-qlnd">
                        <div class="icon-qlnd" onclick="promptToggleUserStatus(${user.id}, this)">
                            <i class="fa-solid ${user.status === 'unlocked' ? 'fa-lock-open' : 'fa-lock'}"></i>
                        </div>
                        <div class="icon-qlnd" onclick="editUser(${user.id})">
                            <i class="fa-solid fa-user-pen"></i>
                        </div>
                    </div>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    // Hiển thị hộp thoại xác nhận khóa/mở khóa người dùng
    function promptToggleUserStatus(userId, iconElement) {
        userToToggle = { userId, iconElement };
        document.getElementById('confirmLockModal').style.display = 'flex';
    }

    // Xác nhận thay đổi trạng thái khóa/mở khóa người dùng
    function confirmToggleStatus() {
        toggleUserStatus(userToToggle.userId, userToToggle.iconElement);
        closeConfirmModal();
    }

    function closeConfirmModal() {
        document.getElementById('confirmLockModal').style.display = 'none';
    }

    // Chuyển đổi trạng thái khóa/mở khóa người dùng
    function toggleUserStatus(userId, iconElement) {
        const users = getUsersFromLocalStorage(); // Lấy người dùng từ localStorage
        const user = users.find(u => u.id === userId);

        if (user) {
            // Thay đổi trạng thái giữa 'locked' và 'unlocked'
            user.status = user.status === 'unlocked' ? 'locked' : 'unlocked';
            saveUsersToLocalStorage(users); // Lưu lại thay đổi vào localStorage

            // Thay đổi icon dựa trên trạng thái
            const icon = iconElement.querySelector('i');
            icon.classList.toggle('fa-lock-open');
            icon.classList.toggle('fa-lock');

            // Cập nhật lại bảng người dùng
            loadUsers();  // Gọi lại hàm loadUsers để cập nhật bảng
        }
    }

    // Mở hộp thoại chỉnh sửa thông tin người dùng
    function editUser(userId) {
        const users = getUsersFromLocalStorage(); // Lấy người dùng từ localStorage
        const user = users.find(u => u.id === userId);

        if (user) {
            currentUserId = userId;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editPhone").value = user.phone || '';
            document.getElementById("editAddress").value = user.address || '';
            document.getElementById("editUserModal").style.display = "flex";
        }
    }

    // Đóng hộp thoại chỉnh sửa người dùng
    function closeEditUserModal() {
        document.getElementById("editUserModal").style.display = "none";
    }

    // Lưu thay đổi thông tin người dùng
    function saveUserChanges() {
        const users = getUsersFromLocalStorage(); // Lấy người dùng từ localStorage
        const user = users.find(u => u.id === currentUserId);

        if (user) {
            user.email = document.getElementById("editEmail").value;
            user.phone = document.getElementById("editPhone").value;
            user.address = document.getElementById("editAddress").value;

            saveUsersToLocalStorage(users); // Lưu thay đổi vào localStorage
            loadUsers(); // Cập nhật lại bảng người dùng
            closeEditUserModal(); // Đóng modal chỉnh sửa
        }
    }

    window.addEventListener("load", function () {
        // Đảm bảo đóng các modal khi trang tải
        document.getElementById("editUserModal").style.display = "none";
        document.getElementById("confirmLockModal").style.display = "none";

        loadUsers(); // Tải danh sách người dùng từ LocalStorage khi trang được tải
    });
