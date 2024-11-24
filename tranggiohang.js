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












function showProductDetails(orderId) {
    const modal = document.getElementById(`product-details-${orderId}`);
    if (modal) {
        modal.style.display = 'block'; // Hiển thị modal tương ứng với ID đơn hàng
    }
}

function closeProductDetails(orderId) {
    const modal = document.getElementById(`product-details-${orderId}`);
    if (modal) {
        modal.style.display = 'none'; // Đóng modal
    }
}


function updateTable() {
    const tableAllOrders = document.getElementById("orders").getElementsByTagName('tbody')[0];
    const tableChuaxuly = document.getElementById("donhangchuaxuly").getElementsByTagName('tbody')[0];
    const tableDaxacnhan = document.getElementById("donhangdaxacnhan").getElementsByTagName('tbody')[0];
    const tableDagiao = document.getElementById("donhangdagiao").getElementsByTagName('tbody')[0];
    const tableDahuy = document.getElementById("donhangdahuy").getElementsByTagName('tbody')[0];

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    tableAllOrders.innerHTML = ''; // Xóa tất cả các đơn hàng trong bảng

    

    // Duyệt qua từng đơn hàng
    orders.forEach(order => {
    const newRow = document.createElement('tr');
    
    // Đảm bảo modal chỉ được tạo một lần cho mỗi đơn hàng và không làm ảnh hưởng đến bảng
    const modalHTML = `
        
        <div class="modal-giohang" id="product-details-${order.orderId}" style="display: none;">
            <div class="modal-content_giohang">
                
                <span class="close-button_giohang" onclick="closeProductDetails('${order.orderId}')">&times;</span>
                <div class= textmodal_giohang>
                <h3 class="header_modal_giohang" >Chi tiết đơn hàng ${order.orderId}</h3>
                <p>Tên: ${order.fullName}</p>
                <p>Địa chỉ: ${order.address}</p>
                <p>Tổng tiền: ${order.totalAmount}</p>
                <p>Ngày đặt: ${order.orderDate}</p>
                <p>Phương thức thanh toán: ${order.paymentMethod}</p>
       
                <p>Trạng thái: ${order.statusText}</p>
                </div>
                <!-- Thêm thông tin chi tiết khác nếu cần -->
            </div>
        </div>
    `;

    // Thêm modal vào một container riêng biệt (nếu có)
    const modalsContainer = document.getElementById('modal');
    modalsContainer.insertAdjacentHTML('beforeend', modalHTML);
     let statusClass = '';
        switch (order.statusText) {
            case 'Chưa xử lý':
                statusClass = 'status pending';
                break;
            case 'Chưa giao hàng':
                statusClass = 'status processing';
                break;
            case 'Đã giao hàng':
                statusClass = 'status completed';
                break;
            case 'Đã hủy':
                statusClass = 'status cancel';
                break;
            default:
                statusClass = 'status-khac';
        }
        newRow.innerHTML = `
        <td><a href="javascript:void(0);" onclick="showProductDetails('${order.orderId}')">${order.orderId}</a></td>
        <td>${order.orderDate}</td>
        <td>${order.fullName}</td>
        <td>${order.address}</td>
        <td>${order.paymentMethod}</td>
        <td>${order.totalAmount}</td>

        <td><span class="status ${statusClass}">${order.statusText}</span></td>
        <td>
            <div class="thaotac">
                ${order.statusText === 'Đã giao hàng' || order.statusText === 'Đã hủy' 
                    ? '<div class="xacnhantren">Đã xử lý đơn hàng thành công</div>'
                    : ` 
                        <div class="xacnhantren">${order.statusText === 'Chưa xử lý' ? 'Xác nhận xử lý' : 'Xác nhận giao hàng'}</div>
                        <div class="xacnhanduoi">
                            <div class="dongyxacnhan">Đồng ý</div>
                            <div class="huyxacnhan">Hủy</div>
                        </div>
                    `
                }
            </div>
        </td>
    `;
    tableAllOrders.appendChild(newRow);



    // Phân loại vào bảng tương ứng
    if (order.statusText === 'Chưa xử lý') {
        const newRowChuaxuly = newRow.cloneNode(true);
        newRowChuaxuly.deleteCell(7);
        tableChuaxuly.appendChild(newRowChuaxuly);
    } else if (order.statusText === 'Chưa giao hàng') {
        const newRowDaxacnhan = newRow.cloneNode(true);
        newRowDaxacnhan.deleteCell(7);
        tableDaxacnhan.appendChild(newRowDaxacnhan);
    } else if (order.statusText === 'Đã giao hàng') {
        const newRowDagiao = newRow.cloneNode(true);
        newRowDagiao.deleteCell(7);
        tableDagiao.appendChild(newRowDagiao);
    } else if (order.statusText === 'Đã hủy') {
        const newRowDahuy = newRow.cloneNode(true);
        newRowDahuy.deleteCell(7);
        tableDahuy.appendChild(newRowDahuy);
    }

    // Gắn sự kiện cho nút "Đồng ý" và "Hủy" nếu trạng thái chưa phải "Đã xử lý"
    if (order.statusText !== 'Đã giao hàng' && order.statusText !== 'Đã hủy') {
        const confirmButton = newRow.querySelector('.dongyxacnhan');
        const cancelButton = newRow.querySelector('.huyxacnhan');
        if (confirmButton) confirmButton.addEventListener('click', () => handleConfirm(order.id));
        if (cancelButton) cancelButton.addEventListener('click', () => handleCancel(order.id));
    }
});

}


function handleConfirm(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    if (order) {
        if (order.statusText === 'Chưa xử lý') {
            order.statusText = 'Chưa giao hàng';
        } else if (order.statusText === 'Chưa giao hàng') {
            order.statusText = 'Đã giao hàng';
        }
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    updateTable();  // Cập nhật bảng để áp dụng các thay đổi
}


function handleCancel(orderId) {
    // Xử lý logic "Hủy" nếu cần (tùy yêu cầu cụ thể)
    console.log(`Hủy xác nhận cho đơn hàng: ${orderId}`);
}
function handleCancel(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId); // Tìm đơn hàng theo ID

    if (order) {
        order.statusText = 'Đã hủy'; // Thay đổi trạng thái thành 'Đã hủy'
        localStorage.setItem('orders', JSON.stringify(orders)); // Lưu lại vào localStorage
        updateTable(); // Cập nhật lại bảng để áp dụng thay đổi
    }
    console.log(`Hủy xác nhận cho đơn hàng: ${orderId}`);
}




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

document.getElementById('start-date').addEventListener('input', filterOrders);
document.getElementById('end-date').addEventListener('input', filterOrders);
document.getElementById('district').addEventListener('change', filterOrders);
document.getElementById('order-status').addEventListener('change', filterOrders);


// Hàm lọc đơn hàng
function filterOrders() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const district = document.getElementById('district').value;
    const status = document.getElementById('order-status').value.toLowerCase().trim();
    const rows = document.querySelectorAll('#orders tbody tr');
    rows.forEach(row => {
        const dateText = row.cells[1].innerText.trim(); // Ngày trong bảng, ví dụ "23/11/2024"
        const orderDistrict = row.cells[3].innerText; // Địa chỉ
        const orderStatus = row.cells[6].innerText; // Trạng thái

        let showRow = true;

                // Chuyển đổi ngày trong bảng về định dạng chuẩn (YYYY-MM-DD)
                const [day, month, year] = dateText.split('/'); // Tách "23/11/2024" thành [23, 11, 2024]
        const rowDate = new Date(`${year}-${month}-${day}`); // Tạo đối tượng Date từ chuỗi

        

        // Kiểm tra ngày bắt đầu
        if (startDate) {
            const start = new Date(startDate);
            if (rowDate < start) showRow = false; // Nếu ngày trong bảng nhỏ hơn ngày bắt đầu
        }

        // Kiểm tra ngày kết thúc
        if (endDate) {
            const end = new Date(endDate);
            if (rowDate > end) showRow = false; // Nếu ngày trong bảng lớn hơn ngày kết thúc
        }

        // Hiển thị hoặc ẩn dòng
        row.style.display = showRow ? '' : 'none';


        // Kiểm tra bộ lọc quận
    if (district) {
    // Chuẩn hóa và tách quận trong cả bộ lọc và trong dữ liệu
    let normalizedDistrict = district.trim().toLowerCase();
    let normalizedOrderDistrict = orderDistrict.trim().toLowerCase();

    // Tách các phần của quận nếu có thể
    let districtParts = normalizedDistrict.split(" "); // Tách phần "Quận" và số
    let orderDistrictParts = normalizedOrderDistrict.split(" "); // Tách phần "Quận" và số

    // Kiểm tra nếu quận và số quận khớp
    if (districtParts.length === 2 && orderDistrictParts.length === 2) {
        let districtNumber = districtParts[1]; // Lấy số quận
        let orderDistrictNumber = orderDistrictParts[1]; // Lấy số quận trong đơn hàng
        
        // So sánh số quận
        if (districtNumber !== orderDistrictNumber) {
            showRow = false;  // Nếu không khớp, ẩn dòng
        }
    } else {
        // Trường hợp không có "Quận" và số
        if (!normalizedOrderDistrict.includes(normalizedDistrict)) {
            showRow = false; // Nếu địa chỉ không khớp, ẩn dòng
        }
    }
}

        // Kiểm tra bộ lọc trạng thái
        if (status && orderStatus.trim().toLowerCase() !== status.trim().toLowerCase()) showRow = false;

        // Hiển thị hoặc ẩn dòng
        row.style.display = showRow ? '' : 'none';
    });
}

// Hàm reset bộ lọc
function resetFilters() {
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    document.getElementById('district').value = '';
    document.getElementById('order-status').value = '';
    filterOrders();
}

// Gọi hàm updateTable để cập nhật bảng
updateTable();