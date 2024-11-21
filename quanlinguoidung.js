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
