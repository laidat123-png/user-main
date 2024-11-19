class Authentication {
    // Định nghĩa phương thức isAuthentication để kiểm tra xem người dùng đã xác thực hay chưa
    isAuthentication() {
        const token = sessionStorage.getItem('token'); // Lấy token từ sessionStorage
        return token; // Trả về token (nếu có)
    }
}

const authentication = new Authentication(); // Tạo một instance của lớp Authentication
export { authentication }; // Xuất instance của lớp Authentication để sử dụng ở các file khác