import { BsStarFill } from 'react-icons/bs';

export const showStars = (star, color, fontSize) => {
    return [...Array(Math.trunc(star))].map((a, i) => {
        const ratingValue = i + 1;
        return (
            ratingValue <= star ? <BsStarFill
                key={i + 10}
                fontSize={fontSize}
                color={color}
            /> : ""
        );
    })
}