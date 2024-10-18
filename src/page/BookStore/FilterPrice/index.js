import { useState } from "react";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
export const FilterPrice = (props) => {
    const { onSubmitFilterPrice, setPaginate } = props;
    const [initPrice, setInitPrice] = useState({
        min: 0,
        max: 500000
    });
    const onReset = () => {
        setPaginate({ page: 1, limit: 9 });
        setInitPrice({ min: 0, max: 500000 });
    }
    return (
        <div className="filter-price">
            <p className="filter-price_title">
                TÌM KIẾM VỚI GIÁ
            </p>
            <form onSubmit={(e) => onSubmitFilterPrice(e, initPrice)}>
                <div className="form-group">
                    <InputRange
                        maxValue={500000}
                        minValue={0}
                        step={10000}
                        onChange={(value) => setInitPrice(value)}
                        InputRangeClassNames="form-control_range"
                        value={initPrice}
                        labelContainer="label-range"
                    />
                    <div className="filter-price_submit">
                        <button type="submit">Tìm</button>
                    </div>
                </div>
            </form>
            <button className="reset-product_btn" onClick={onReset}>Reset</button>
        </div >
    )
}