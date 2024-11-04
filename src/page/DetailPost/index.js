import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Comment } from "./comment";
import { createMarkup } from '../../helpers/createMarkup';
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { getOnePostRequest, addCmtPostRequest, replyCmtRequest, deleteCommentRequest } from "../../actions/actionPosts";
import { BoxProduct } from "../../components/BoxProduct";
import { BoxCt } from "../../components/BoxCt";
import { SkeletonPostDetail } from "./SkeletonPostDetail";
import { PopupCustom } from "../../components/PopupCustom";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/configToast";

export const DetailPost = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const post = useSelector(state => state.posts.post);
    const posts = useSelector(state => state.posts.postAll);
    const comments = useSelector(state => state.comment);
    const loadingCmt = useSelector(state => state.loading.loadingcmt);
    const loadingdtb = useSelector(state => state.loading.loadingdtb);
    const productsSale = useSelector(state => state.products.productsSale);
    const types = useSelector(state => state.products.typeProduct);
    const productTopRate = useSelector(state => state.products.productTopRate);
    const userID = useSelector(state => state.user._id);
    const [index, setIndex] = useState(-1);
    const [showForm, setShowForm] = useState("");
    useEffect(() => {
        getOnePostRequest(dispatch, params.id);
        setIndex(findIndex(params.id, posts));
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        });
    }, [params.id]);
    const findIndex = (id, arr) => {
        let index = -1;
        arr.forEach((element, i) => {
            if (element._id === id) index = i;
        });
        return index;
    }
    const onSubmitCmt = (data, id) => {
        if (userID) {
            if (id) {
                replyCmtRequest(dispatch, data, id);
            } else {
                addCmtPostRequest(dispatch, data, post._id);
            }
        } else {
            toast("Hãy đăng nhập để bình luận", toastConfig);
        }
    }
    const onDeleteComment = (idCmt, idPost) => {
        deleteCommentRequest(dispatch, idCmt, idPost);
        setShowForm("");
    }
    return (
        <div className="blog-detail">
            <Container>
                <Row>
                    <Col lg={8}>
                        {loadingdtb ? <SkeletonPostDetail /> : <div className="blog-post_wrap">
                            <article className="blog-post br">
                                <span className="blog-sticky">{post.tags}</span>
                                <div className="blog-post_header">
                                    <p className="blog-post_date">Ngày đăng: {new Date(post.createdAt).toLocaleDateString()}</p>
                                    <h2 className="blog-post_title">{post.title}</h2>
                                    <p className="blog-post_author">Đăng bởi {`${post?.author?.firstName} ${post?.author?.lastName}`}</p>
                                    <img className="blog-post_img" src={post?.image} alt={post.title} />
                                </div>
                                <div className="blog-post_content">
                                    <div className="content" dangerouslySetInnerHTML={createMarkup(post.content)}></div>
                                </div>
                            </article>
                            <nav className="nav-post">
                                {index - 1 < 0 ? <Link to={`/CHITIETBAIVIET/${posts[posts.length - 1]._id}`} className="nav-pre">
                                    <span><AiOutlineLeft /></span>
                                    <div>
                                        <p className="blog-post-title">{posts[posts.length - 1].title}</p>
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[posts.length - 1].createdAt).toLocaleDateString()}</p>
                                    </div>
                                </Link> : <Link to={`/CHITIETBAIVIET/${posts[index - 1]._id}`} className="nav-pre">
                                    <span><AiOutlineLeft /></span>
                                    <div>
                                        <p className="blog-post-title">{posts[index - 1].title}</p>
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[index - 1].createdAt).toLocaleDateString()}</p>
                                    </div>
                                </Link>}
                                {index + 1 >= posts.length ? <Link to={`/CHITIETBAIVIET/${posts[0]._id}`} className="nav-next">
                                    <div>
                                        <p className="blog-post-title">{posts[0].title}</p>
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[0].createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span><AiOutlineRight /></span>
                                </Link> : <Link to={`/CHITIETBAIVIET/${posts[index + 1]._id}`} className="nav-next">
                                    <div>
                                        <p className="blog-post-title">{posts[index + 1].title}</p>
                                        <p className="blog-post_date">Ngày đăng : {new Date(posts[index + 1].createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span><AiOutlineRight /></span>
                                </Link>}
                            </nav>
                            <div className="blog-comment">
                                <h2 className="blog-comment_title">{comments.reduce((t, c) => ++t + c?._id?.reply?.length, 0)} bình luận với “{post.title}”</h2>
                                <ul className="blog-comment_list">
                                    {comments.map(cmt => {
                                        return (
                                            <li className="blog-comment_item" key={cmt._id._id}>
                                                <img src={cmt._id?.author.image} alt="Ảnh đại diện" />
                                                <div className="blog-comment_box">
                                                    <p className="blog-comment_author">
                                                        <span>
                                                            {`${cmt._id?.author.firstName} ${cmt._id?.author.lastName}`}
                                                        </span>
                                                        {userID === cmt._id.author._id ? <span>
                                                            <PopupCustom
                                                                onDeleteComment={onDeleteComment}
                                                                idCmt={cmt._id._id}
                                                                idPost={post._id}
                                                            />
                                                        </span> : ""}
                                                    </p>
                                                    <p className="blog-comment_date">{new Date(cmt._id.createdAt).toLocaleString()}</p>
                                                    <p className="blog-comment_content">{cmt._id.content}</p>
                                                    <p
                                                        onClick={() => setShowForm(cmt._id._id)}
                                                        className="blog-comment_replyBtn">Reply</p>
                                                    {cmt._id._id === showForm ? <Comment
                                                        idCmt={cmt._id._id}
                                                        closeButton={true}
                                                        loadingCmt={loadingCmt}
                                                        closeCmt={() => setShowForm("")}
                                                        onSubmitCmt={onSubmitCmt}
                                                    /> : ""}
                                                    <ul className="blog-comment_list">
                                                        {cmt?._id.reply?.map(rl => {
                                                            return (
                                                                <li className="blog-comment_item" key={rl._id || rl._idReply._id}>
                                                                    <img src={rl._idReply.author.image} alt="Ảnh đại diện" />
                                                                    <div className="blog-comment_box--reply">
                                                                        <p className="blog-comment_author">{`${rl._idReply.author.firstName} ${rl._idReply.author.lastName}`}</p>
                                                                        <p className="blog-comment_date">{new Date(rl._idReply.createdAt).toLocaleString()}</p>
                                                                        <p className="blog-comment_content">{rl._idReply.content}</p>
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
                                    onSubmitCmt={onSubmitCmt}
                                    loadingCmt={loadingCmt}
                                /> : ""}
                            </div>
                        </div>}
                    </Col>
                    <Col lg={4}>
                        <BoxProduct
                            products={productTopRate}
                            label="TOP SẢN PHẨM ĐÁNH GIÁ CAO"
                        />
                        <BoxCt
                            data={posts}
                            label="BÀI VIẾT GẦN ĐÂY"
                            length={5}
                            type="post"
                        />
                        <BoxCt
                            data={types}
                            label="THỂ LOẠI SÁCH"
                            length={types.length}
                        />
                        <BoxProduct
                            label="SẢN PHẨM GIẢM GIÁ"
                            products={productsSale}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}