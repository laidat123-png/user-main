import { Container, Row, Col } from "react-bootstrap"; // Import các component Container, Row, Col từ react-bootstrap
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Import các biểu tượng từ react-icons
import { Comment } from "./comment"; // Import component Comment
import { createMarkup } from '../../helpers/createMarkup'; // Import hàm createMarkup để tạo nội dung HTML an toàn
import { useParams } from "react-router"; // Import useParams từ react-router để lấy tham số từ URL
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch và useSelector từ react-redux
import { Link } from "react-router-dom"; // Import Link từ react-router-dom để điều hướng giữa các trang
import "./index.css"; // Import file CSS cho component
import { useEffect, useState } from "react"; // Import useEffect và useState từ react
import { getOnePostRequest, addCmtPostRequest, replyCmtRequest, deleteCommentRequest } from "../../actions/actionPosts"; // Import các action liên quan đến bài viết
import { BoxProduct } from "../../components/BoxProduct"; // Import component BoxProduct
import { BoxCt } from "../../components/BoxCt"; // Import component BoxCt
import { SkeletonPostDetail } from "./SkeletonPostDetail"; // Import component SkeletonPostDetail để hiển thị khi đang tải bài viết
import { PopupCustom } from "../../components/PopupCustom"; // Import component PopupCustom để hiển thị popup tùy chỉnh
import { toast } from "react-toastify"; // Import thư viện toast để hiển thị thông báo
import { toastConfig } from "../../constants/configToast"; // Import cấu hình toast

// Định nghĩa component DetailPost
export const DetailPost = () => {
    const dispatch = useDispatch(); // Sử dụng useDispatch để lấy hàm dispatch
    const params = useParams(); // Lấy tham số từ URL
    const post = useSelector(state => state.posts.post); // Lấy thông tin bài viết từ state
    const posts = useSelector(state => state.posts.postAll); // Lấy danh sách tất cả bài viết từ state
    const comments = useSelector(state => state.comment); // Lấy danh sách bình luận từ state
    const loadingCmt = useSelector(state => state.loading.loadingcmt); // Lấy trạng thái loading của bình luận từ state
    const loadingdtb = useSelector(state => state.loading.loadingdtb); // Lấy trạng thái loading của bài viết từ state
    const productsSale = useSelector(state => state.products.productsSale); // Lấy danh sách sản phẩm giảm giá từ state
    const types = useSelector(state => state.products.typeProduct); // Lấy danh sách thể loại sản phẩm từ state
    const productTopRate = useSelector(state => state.products.productTopRate); // Lấy danh sách sản phẩm đánh giá cao từ state
    const userID = useSelector(state => state.user._id); // Lấy ID người dùng từ state
    const [index, setIndex] = useState(-1); // Khởi tạo state index
    const [showForm, setShowForm] = useState(""); // Khởi tạo state showForm

    useEffect(() => {
        getOnePostRequest(dispatch, params.id); // Gọi action để lấy thông tin bài viết
        setIndex(findIndex(params.id, posts)); // Thiết lập index của bài viết
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        }); // Cuộn trang đến vị trí (500, 500) khi component được render
    }, [params.id]);

    // Hàm tìm chỉ số của bài viết trong danh sách bài viết
    const findIndex = (id, arr) => {
        let index = -1;
        arr.forEach((element, i) => {
            if (element._id === id) index = i;
        });
        return index;
    }

    // Hàm xử lý khi submit bình luận
    const onSubmitCmt = (data, id) => {
        if (userID) {
            if (id) {
                replyCmtRequest(dispatch, data, id); // Gọi action để trả lời bình luận
            } else {
                addCmtPostRequest(dispatch, data, post._id); // Gọi action để thêm bình luận
            }
        } else {
            toast("Hãy đăng nhập để bình luận", toastConfig); // Hiển thị thông báo yêu cầu đăng nhập
        }
    }

    // Hàm xử lý khi xóa bình luận
    const onDeleteComment = (idCmt, idPost) => {
        deleteCommentRequest(dispatch, idCmt, idPost); // Gọi action để xóa bình luận
        setShowForm(""); // Thiết lập lại state showForm
    }

    return (
        <div className="blog-detail">
            <Container>
                <Row>
                    <Col lg={8}>
                        {loadingdtb ? <SkeletonPostDetail /> : <div className="blog-post_wrap">
                            <article className="blog-post br">
                                <span className="blog-sticky">{post.tags}</span> {/* Hiển thị thẻ của bài viết */}
                                <div className="blog-post_header">
                                    <p className="blog-post_date">Ngày đăng: {new Date(post.createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày đăng bài viết */}
                                    <h2 className="blog-post_title">{post.title}</h2> {/* Hiển thị tiêu đề bài viết */}
                                    <p className="blog-post_author">Đăng bởi {post?.author ? `${post?.author?.firstName} ${post?.author?.lastName}` : "Người dùng đã bị xóa"}</p> {/* Hiển thị tên tác giả bài viết */}
                                    <img className="blog-post_img" src={post?.image} alt={post.title} /> {/* Hiển thị hình ảnh bài viết */}
                                </div>
                                <div className="blog-post_content">
                                    <div className="content" dangerouslySetInnerHTML={createMarkup(post.content)}></div> {/* Hiển thị nội dung bài viết */}
                                </div>
                            </article>
                            <nav className="nav-post">
                                {index - 1 < 0 ? <Link to={`/CHITIETBAIVIET/${posts[posts.length - 1]._id}`} className="nav-pre">
                                    <span><AiOutlineLeft /></span> {/* Hiển thị biểu tượng mũi tên trái */}
                                    <div>
                                        <p className="blog-post-title">{posts[posts.length - 1].title}</p> {/* Hiển thị tiêu đề bài viết trước */}
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[posts.length - 1].createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày đăng bài viết trước */}
                                    </div>
                                </Link> : <Link to={`/CHITIETBAIVIET/${posts[index - 1]._id}`} className="nav-pre">
                                    <span><AiOutlineLeft /></span> {/* Hiển thị biểu tượng mũi tên trái */}
                                    <div>
                                        <p className="blog-post-title">{posts[index - 1].title}</p> {/* Hiển thị tiêu đề bài viết trước */}
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[index - 1].createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày đăng bài viết trước */}
                                    </div>
                                </Link>}
                                {index + 1 >= posts.length ? <Link to={`/CHITIETBAIVIET/${posts[0]._id}`} className="nav-next">
                                    <div>
                                        <p className="blog-post-title">{posts[0].title}</p> {/* Hiển thị tiêu đề bài viết tiếp theo */}
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[0].createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày đăng bài viết tiếp theo */}
                                    </div>
                                    <span><AiOutlineRight /></span> {/* Hiển thị biểu tượng mũi tên phải */}
                                </Link> : <Link to={`/CHITIETBAIVIET/${posts[index + 1]._id}`} className="nav-next">
                                    <div>
                                        <p className="blog-post-title">{posts[index + 1].title}</p> {/* Hiển thị tiêu đề bài viết tiếp theo */}
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[index + 1].createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày đăng bài viết tiếp theo */}
                                    </div>
                                    <span><AiOutlineRight /></span> {/* Hiển thị biểu tượng mũi tên phải */}
                                </Link>}
                            </nav>
                            <div className="blog-comment">
                                <h2 className="blog-comment_title">{comments.reduce((t, c) => ++t + c?._id?.reply?.length, 0)} bình luận với “{post.title}”</h2> {/* Hiển thị số lượng bình luận */}
                                <ul className="blog-comment_list">
                                    {comments.map(cmt => {
                                        return (
                                            <li className="blog-comment_item" key={cmt._id._id}>
                                                <img src={cmt._id?.author?.image || "default-avatar.png"} alt="Ảnh đại diện" /> {/* Hiển thị ảnh đại diện của người bình luận */}
                                                <div className="blog-comment_box">
                                                    <p className="blog-comment_author">
                                                        <span>
                                                            {cmt._id?.author ? `${cmt._id?.author.firstName} ${cmt._id?.author.lastName}` : "Người dùng đã bị xóa"} {/* Hiển thị tên người bình luận */}
                                                        </span>
                                                        {userID === cmt._id.author?._id ? <span>
                                                            <PopupCustom
                                                                onDeleteComment={onDeleteComment} // Truyền hàm onDeleteComment vào component PopupCustom
                                                                idCmt={cmt._id._id} // Truyền idCmt vào component PopupCustom
                                                                idPost={post._id} // Truyền idPost vào component PopupCustom
                                                            />
                                                        </span> : ""}
                                                    </p>
                                                    <p className="blog-comment_date">{new Date(cmt._id.createdAt).toLocaleString()}</p> {/* Hiển thị ngày bình luận */}
                                                    <p className="blog-comment_content">{cmt._id.content}</p> {/* Hiển thị nội dung bình luận */}
                                                    <p
                                                        onClick={() => setShowForm(cmt._id._id)}
                                                        className="blog-comment_replyBtn">Reply</p> {/* Hiển thị nút trả lời bình luận */}
                                                    {cmt._id._id === showForm ? <Comment
                                                        idCmt={cmt._id._id} // Truyền idCmt vào component Comment
                                                        closeButton={true} // Truyền closeButton vào component Comment
                                                        loadingCmt={loadingCmt} // Truyền loadingCmt vào component Comment
                                                        closeCmt={() => setShowForm("")} // Truyền hàm closeCmt vào component Comment
                                                        onSubmitCmt={onSubmitCmt} // Truyền hàm onSubmitCmt vào component Comment
                                                    /> : ""}
                                                    <ul className="blog-comment_list">
                                                        {cmt?._id.reply?.map(rl => {
                                                            return (
                                                                <li className="blog-comment_item" key={rl._id || rl._idReply._id}>
                                                                    <img src={rl._idReply.author?.image || "default-avatar.png"} alt="Ảnh đại diện" /> {/* Hiển thị ảnh đại diện của người trả lời bình luận */}
                                                                    <div className="blog-comment_box--reply">
                                                                        <p className="blog-comment_author">{rl._idReply.author ? `${rl._idReply.author.firstName} ${rl._idReply.author.lastName}` : "Người dùng đã bị xóa"}</p> {/* Hiển thị tên người trả lời bình luận */}
                                                                        <p className="blog-comment_date">{new Date(rl._idReply.createdAt).toLocaleString()}</p> {/* Hiển thị ngày trả lời bình luận */}
                                                                        <p className="blog-comment_content">{rl._idReply.content}</p> {/* Hiển thị nội dung trả lời bình luận */}
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                {showForm === "" ? <Comment
                                    onSubmitCmt={onSubmitCmt} // Truyền hàm onSubmitCmt vào component Comment
                                    loadingCmt={loadingCmt} // Truyền loadingCmt vào component Comment
                                /> : ""}
                            </div>
                        </div>}
                    </Col>
                    <Col lg={4}>
                        <BoxProduct
                            products={productTopRate} // Truyền danh sách sản phẩm đánh giá cao vào component BoxProduct
                            label="TOP SẢN PHẨM ĐÁNH GIÁ CAO" // Truyền tiêu đề vào component BoxProduct
                        />
                        <BoxCt
                            data={posts} // Truyền danh sách bài viết vào component BoxCt
                            label="BÀI VIẾT GẦN ĐÂY" // Truyền tiêu đề vào component BoxCt
                            length={5} // Truyền số lượng bài viết hiển thị vào component BoxCt
                            type="post" // Truyền loại dữ liệu vào component BoxCt
                        />
                        <BoxCt
                            data={types} // Truyền danh sách thể loại sản phẩm vào component BoxCt
                            label="THỂ LOẠI SÁCH" // Truyền tiêu đề vào component BoxCt
                            length={types.length} // Truyền số lượng thể loại hiển thị vào component BoxCt
                        />
                        <BoxProduct
                            label="SẢN PHẨM GIẢM GIÁ" // Truyền tiêu đề vào component BoxProduct
                            products={productsSale} // Truyền danh sách sản phẩm giảm giá vào component BoxProduct
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}