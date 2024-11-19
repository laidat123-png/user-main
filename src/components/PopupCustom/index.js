import Popup from 'reactjs-popup'; // Import component Popup từ thư viện reactjs-popup
import 'reactjs-popup/dist/index.css'; // Import file CSS của reactjs-popup
import './index.css'; // Import file CSS cho component
import { AiFillCloseCircle } from 'react-icons/ai'; // Import biểu tượng đóng từ react-icons

// Định nghĩa component PopupCustom
export const PopupCustom = (props) => {
    const { onDeleteComment, idCmt, idPost } = props; // Lấy các props truyền vào component

    return (
        <Popup 
            trigger={<button className="popup-btn"><AiFillCloseCircle fontSize="1.1rem" cursor="pointer" /></button>} // Nút kích hoạt popup với biểu tượng đóng
            position="top right" // Vị trí của popup
        >
            {close => (
                <div className="content-popup">
                    <p>Bạn muốn xóa bình luận này?</p> {/* Hiển thị thông báo xác nhận xóa bình luận */}
                    <div>
                        <button className="popup-button" onClick={() => {
                            onDeleteComment(idCmt, idPost); // Gọi hàm onDeleteComment với idCmt và idPost
                            close(); // Đóng popup
                        }}>
                            Đồng ý
                        </button>
                        <button className="popup-button" onClick={close}>
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}