import { useState } from "react";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export const FilterPrice = (props) => {
    const { onSubmitFilterPrice, setPaginate } = props;
    const [initPrice, setInitPrice] = useState({
        min: 0,
        max: 500000
    });
    const [selectedRange, setSelectedRange] = useState(null);
    const [filterPrice, setFilterPrice] = useState({
        min: 0,
        max: 99999999
    });

    const onReset = () => {
        setPaginate({ page: 1, limit: 9 });
        setSelectedRange(null);
        setFilterPrice({ min: 0, max: 99999999 });
    };

    const handleCheckboxChange = (e) => {
        const value = e.target.value.split('-').map(Number);
        setFilterPrice({ min: value[0], max: value[1] });
        setSelectedRange(e.target.value);
    };

    return (
        <div className="filter-price">
            <p className="filter-price_titlea">
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

            <p className="filter-price_titleb">
                LỌC THEO GIÁ
            </p>
            <form onSubmit={(e) => onSubmitFilterPrice(e, filterPrice)}>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="0-50000"
                            checked={selectedRange === "0-50000"}
                            onChange={handleCheckboxChange}
                        />
                        <span>0đ - 50,000đ</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="49999-300000"
                            checked={selectedRange === "49999-300000"}
                            onChange={handleCheckboxChange}
                        />
                        <span>50,000đ - 300,000đ</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="299999-500000"
                            checked={selectedRange === "299999-500000"}
                            onChange={handleCheckboxChange}
                        />
                        <span>300,000đ - 500,000đ</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="499999-99999999"
                            checked={selectedRange === "499999-99999999"}
                            onChange={handleCheckboxChange}
                        />
                        <span>500,000đ - Trở Lên</span>
                    </label>
                    <div className="filter-price_submit">
                        <button type="submit">Lọc</button>
                    </div>
                </div>
            </form>
        </div>
    );
};