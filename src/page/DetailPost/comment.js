import { useForm } from 'react-hook-form';
import { Spinner } from '../../components/Spinner';

export const Comment = (props) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { closeButton, closeCmt, onSubmitCmt, idCmt, loadingCmt } = props;
    const onSubmit = (data) => {
        if (closeButton) {
            data.userID = sessionStorage.getItem("userID");
            onSubmitCmt(data, idCmt)
        } else {
            onSubmitCmt(data);
        }
        setValue("content", "");
    }
    return (
        <div className="reply-comment_box">
            <div className="reply-comment_title">
                <h2>Để lại bình luận của bạn</h2>
                {closeButton ? <span onClick={closeCmt}>Hủy trả lời</span> : ""}
            </div>
            <form className="reply-comment_form" onSubmit={handleSubmit(onSubmit)}>
                <label>Đăng nhập trước khi bình luận*</label>
                <textarea
                    cols="45" rows="5"
                    placeholder="Nội dung..."
                    {...register("content", { required: true })}
                />
                {errors.content && <span style={{ color: "red" }}>Vui lòng nhập nội dung</span>}
                <br />
                <button type="submit" className="reply-comment_submit">{loadingCmt ? <Spinner /> : "GỬI BÌNH LUẬN"}</button>
            </form>
        </div >
    )
}