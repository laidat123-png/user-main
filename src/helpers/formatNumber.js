// Định nghĩa hàm formatNumber
export const formatNumber = (num) => {
    if (num === undefined || num === null) {
        return '0'; // Trả về '0' nếu num là undefined hoặc null
    }
    return num.toLocaleString(undefined, { minimumFractionDigits: 0 }) // Định dạng số thành chuỗi với ít nhất 0 chữ số thập phân
}