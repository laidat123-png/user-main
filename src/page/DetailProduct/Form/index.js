
import StarRatings from 'react-star-ratings';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Spinner } from '../../../components/Spinner';
export const Form = (props) => {
    const { onSubmitReview, isLoadingCmt } = props;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [rating, setRating] = useState(0);
    const onChangeRating = (newRating) => {
        setRating(newRating)
    }
    const onSubmitFormReview = (data) => {
        if (data.cookies) localStorage.setItem("userReview", JSON.stringify({ name: data.name, email: data.email }));
        delete data.cookies;
        if (rating === 0) toast.error("Vui lòng chọn số sao!", {
            position: "top-center",
            autoClose: 3000,
            closeButton: true
        })
        else {
            data.stars = rating;
            data.date = Date.now();
            onSubmitReview(data);
            setValue("content", "");
            setRating(0);
        }
    }
    return (
        <div className="review-tab_form">
            <h2 className="reviews_title">Thêm review</h2>
            <form className="reviews-form" onSubmit={handleSubmit(onSubmitFormReview)}>
                <p className="reviews-form_note">Bạn phải đăng nhập mới được thêm review *</p>
                <div className="reviews-form_rating">
                    <label>Số sao đánh giá *</label>
                    <div className="stars">
                        <StarRatings
                            rating={rating}
                            starRatedColor="black"
                            changeRating={onChangeRating}
                            numberOfStars={5}
                            starHoverColor="black"
                            name='stars'
                            starDimension="1.5rem"
                        />
                    </div>
                </div>
                <div className="reviews-form_text">
                    <label>Nội dung*</label>
                    <textarea
                        {...register("content", { required: true })}
                        cols={45}
                        row={10}
                    />
                </div>
                {errors.content && <span className="errors">Vui lòng nhập nội dung</span>}
                <div className="reviews-form_submit">
                    <button type="submit">{isLoadingCmt ? <Spinner /> : "Gửi review"}</button>
                </div>
            </form>
        </div>

    )
}