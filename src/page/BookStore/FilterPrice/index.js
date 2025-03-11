import { useState } from "react"; // Import useState từ react
import InputRange from 'react-input-range'; // Import component InputRange từ react-input-range
import 'react-input-range/lib/css/index.css'; // Import file CSS của react-input-range
import CompositeFilter from './CompositeFilter'; // Import CompositeFilter
import PriceFilter from './PriceFilter'; // Import PriceFilter

// Định nghĩa component FilterPrice
export const FilterPrice = (props) => {
    const { onSubmitFilterPrice, setPaginate } = props; // Lấy các props truyền vào component
    const [initPrice, setInitPrice] = useState({
        min: 0,
        max: 500000
    }); // Khởi tạo state initPrice để quản lý giá ban đầu
    const [selectedRange, setSelectedRange] = useState(null); // Khởi tạo state selectedRange để quản lý khoảng giá được chọn
    const [filterPrice, setFilterPrice] = useState({
        min: 0,
        max: 99999999
    }); // Khởi tạo state filterPrice để quản lý giá lọc

    const compositeFilter = new CompositeFilter();

    // Hàm reset bộ lọc
    const onReset = () => {
        setPaginate({ page: 1, limit: 9 }); // Thiết lập lại phân trang
        setSelectedRange(null); // Thiết lập lại khoảng giá được chọn
        setFilterPrice({ min: 0, max: 99999999 }); // Thiết lập lại giá lọc
    };

    // Hàm xử lý khi thay đổi checkbox
    const handleCheckboxChange = (e) => {
        const value = e.target.value.split('-').map(Number); // Chuyển giá trị của checkbox thành mảng số
        setFilterPrice({ min: value[0], max: value[1] }); // Thiết lập giá lọc
        setSelectedRange(e.target.value); // Thiết lập khoảng giá được chọn
    };

    // Hàm xử lý khi submit form
    const handleSubmit = (e, price) => {
        e.preventDefault();
        compositeFilter.addFilter(new PriceFilter(price.min, price.max));
        const result = compositeFilter.applyFilter();
        onSubmitFilterPrice(e, result);
    };

    return (
        <div className="filter-price">
            <p className="filter-price_titlea">
                TÌM KIẾM VỚI GIÁ
            </p>
            <form onSubmit={(e) => handleSubmit(e, initPrice)}> {/* Gọi hàm handleSubmit khi form được submit */}
                <div className="form-group">
                    <InputRange
                        maxValue={500000} // Giá trị tối đa của khoảng giá
                        minValue={0} // Giá trị tối thiểu của khoảng giá
                        step={10000} // Bước nhảy của khoảng giá
                        onChange={(value) => setInitPrice(value)} // Thiết lập giá ban đầu khi thay đổi khoảng giá
                        InputRangeClassNames="form-control_range"
                        value={initPrice} // Giá trị của khoảng giá
                        labelContainer="label-range"
                    />
                    <div className="filter-price_submit">
                        <button type="submit">Tìm</button> {/* Nút submit để tìm kiếm */}
                    </div>
                </div>
            </form>
            <button className="reset-product_btn" onClick={onReset}>Reset</button> {/* Nút reset bộ lọc */}

            <p className="filter-price_titleb">
                LỌC THEO GIÁ
            </p>
            <form onSubmit={(e) => handleSubmit(e, filterPrice)}> {/* Gọi hàm handleSubmit khi form được submit */}
                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="0-50000"
                            checked={selectedRange === "0-50000"} // Kiểm tra xem khoảng giá có được chọn không
                            onChange={handleCheckboxChange} // Gọi hàm handleCheckboxChange khi thay đổi checkbox
                        />
                        <span>0đ - 50,000đ</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="49999-300000"
                            checked={selectedRange === "49999-300000"} // Kiểm tra xem khoảng giá có được chọn không
                            onChange={handleCheckboxChange} // Gọi hàm handleCheckboxChange khi thay đổi checkbox
                        />
                        <span>50,000đ - 300,000đ</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="299999-500000"
                            checked={selectedRange === "299999-500000"} // Kiểm tra xem khoảng giá có được chọn không
                            onChange={handleCheckboxChange} // Gọi hàm handleCheckboxChange khi thay đổi checkbox
                        />
                        <span>300,000đ - 500,000đ</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            value="499999-99999999"
                            checked={selectedRange === "499999-99999999"} // Kiểm tra xem khoảng giá có được chọn không
                            onChange={handleCheckboxChange} // Gọi hàm handleCheckboxChange khi thay đổi checkbox
                        />
                        <span>500,000đ - Trở Lên</span>
                    </label>
                    <div className="filter-price_submit">
                        <button type="submit">Lọc</button> {/* Nút submit để lọc */}
                    </div>
                </div>
            </form>
        </div>
    );
};