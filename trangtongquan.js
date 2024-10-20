// Hàm để làm cho số liệu chạy tới giá trị đúng
function animateValue(id, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        document.getElementById(id).textContent = currentValue;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Khởi động hiệu ứng cho các số liệu
animateValue("total-customers", 0, 100, 1000); // Thay đổi giá trị theo dữ liệu thực tế
animateValue("total-purchases", 0, 200, 1000);
animateValue("total-products", 0, 150, 1000);
animateValue("products-near-out", 0, 5, 1000);

// Dữ liệu thu nhập của năm nay và năm trước
const currentYearData = [3000, 2500, 3200, 2900, 2700, 3100, 3300, 2800, 3600]; // 9 tháng
const previousYearData = [2800, 2200, 3100, 2500, 2900, 3000, 2700, 2500, 3300, 3200, 3400, 3500]; // 12 tháng

// Tạo biểu đồ
const ctx = document.getElementById('incomeChart').getContext('2d');

// Tháng hiển thị
const labels = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5',
    'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10',
    'Tháng 11', 'Tháng 12'
];

const incomeChart = new Chart(ctx, {
    type: 'line', // Biểu đồ dạng đường
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Năm Nay',
                data: currentYearData.concat(new Array(3).fill(null)), // Thêm null cho các tháng không có dữ liệu
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền cho khu vực bên dưới đường
                borderColor: 'rgba(75, 192, 192, 1)', // Màu cho đường
                borderWidth: 3, // Độ dày của đường
                fill: true, // Đổ màu bên dưới đường
                pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu cho các điểm
                pointBorderColor: '#fff', // Màu viền cho các điểm
                pointRadius: 5, // Kích thước của các điểm
                pointHoverRadius: 7, // Kích thước khi hover
                tension: 0.4, // Độ cong của đường
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)' // Màu nền khi hover
            },
            {
                label: 'Năm Trước',
                data: previousYearData, // Dữ liệu cho năm trước
                backgroundColor: 'rgba(153, 102, 255, 0.2)', // Màu nền cho khu vực bên dưới đường
                borderColor: 'rgba(153, 102, 255, 1)', // Màu cho đường
                borderWidth: 3, // Độ dày của đường
                fill: true, // Đổ màu bên dưới đường
                pointBackgroundColor: 'rgba(153, 102, 255, 1)', // Màu cho các điểm
                pointBorderColor: '#fff', // Màu viền cho các điểm
                pointRadius: 5, // Kích thước của các điểm
                pointHoverRadius: 7, // Kích thước khi hover
                tension: 0.4, // Độ cong của đường
                hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)' // Màu nền khi hover
            }
        ]
    },
    options: {
        responsive: true, // Responsive
        maintainAspectRatio: false, // Không giữ tỷ lệ khung hình
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.5)', // Màu lưới
                }
            },
            x: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.5)', // Màu lưới
                }
            }
        },
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(75, 75, 75, 0.8)', // Màu nền cho tooltip
                titleColor: '#fff', // Màu tiêu đề
                bodyColor: '#fff' // Màu nội dung
            },
            legend: {
                labels: {
                    color: '#333' // Màu chữ cho nhãn
                }
            }
        }
    }
});

// Tạo hiệu ứng cho biểu đồ
const animateChart = () => {
    const duration = 1000; // Thời gian hoạt động
    const frames = 60; // Số khung hình
    const step = duration / frames; // Thời gian cho mỗi khung hình
    const increment1 = (Math.max(...currentYearData) / frames); // Tăng dần cho năm nay
    const increment2 = (Math.max(...previousYearData) / frames); // Tăng dần cho năm trước

    let currentFrame = 0;
    const interval = setInterval(() => {
        if (currentFrame < frames) {
            chartData[0] += increment1;
            chartData[1] += increment2;
            incomeChart.data.datasets[0].data = currentYearData.map(value => (value ? Math.floor(value * (currentFrame / frames)) : null));
            incomeChart.data.datasets[1].data = previousYearData.map(value => Math.floor(value * (currentFrame / frames)));
            incomeChart.update();
            currentFrame++;
        } else {
            clearInterval(interval);
        }
    }, step);
};

animateChart();