// Định nghĩa hàm formatNumber
export const formatNumber = (num) => {
    return num.toLocaleString(undefined, { minimumFractionDigits: 0 }) // Định dạng số thành chuỗi với ít nhất 0 chữ số thập phân
}