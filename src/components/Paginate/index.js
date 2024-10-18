
import ReactPaginate from 'react-paginate';
import './index.css';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
export const Paginate = (props) => {
    const { totalPage, onChangePaginate } = props;
    const onChangePage = (value) => {
        onChangePaginate(value.selected + 1);
        window.scrollTo(400, 400)
    }
    return (
        <ReactPaginate
            containerClassName='container-pagination'
            pageClassName='page-pagination'
            activeClassName='active-pagination'
            nextLabel={<AiFillRightCircle />}
            previousLabel={< AiFillLeftCircle />}
            previousClassName='control-pagination'
            nextClassName='control-pagination'
            pageCount={totalPage}
            onPageChange={onChangePage}
        />
    )
}