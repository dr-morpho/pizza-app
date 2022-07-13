import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCountPage } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

const Pagination: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.filterSlice.page);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCountPage(event.selected + 1))}
      forcePage={currentPage - 1}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null!}
    />
  );
};

export default Pagination;
