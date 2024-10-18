
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './index.css';
import { AiFillCloseCircle } from 'react-icons/ai';

export const PopupCustom = (props) => {
    const { onDeleteComment, idCmt, idPost } = props;
    return (
        <Popup trigger={<button className="popup-btn"><AiFillCloseCircle fontSize="1.1rem" cursor="pointer" /></button>} position="top right">
            {close => (
                <div className="content-popup">
                    <p>Bạn muốn xóa bình luận này?</p>
                    <div>
                        <button className="popup-button" onClick={() => {
                            onDeleteComment(idCmt, idPost);
                            close();
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