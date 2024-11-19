import { BsStarFill } from 'react-icons/bs'; // Import biểu tượng ngôi sao đầy từ react-icons

// Định nghĩa hàm showStars
export const showStars = (star, color, fontSize) => {
    return [...Array(Math.trunc(star))].map((a, i) => { // Tạo một mảng với số lượng phần tử bằng số sao (lấy phần nguyên của star) và duyệt qua từng phần tử
        const ratingValue = i + 1; // Xác định giá trị đánh giá hiện tại
        return (
            ratingValue <= star ? <BsStarFill
                key={i + 10} // Thiết lập key cho mỗi ngôi sao
                fontSize={fontSize} // Thiết lập kích thước font cho ngôi sao
                color={color} // Thiết lập màu sắc cho ngôi sao
            /> : "" // Nếu giá trị đánh giá nhỏ hơn hoặc bằng số sao, hiển thị ngôi sao đầy, ngược lại không hiển thị gì
        );
    })
}