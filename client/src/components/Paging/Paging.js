import './Paging.css';
import Pagination from 'react-js-pagination';

const Paging = ({
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItemsCount,
}) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
