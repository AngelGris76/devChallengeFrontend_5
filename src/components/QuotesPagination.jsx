import LeftThanIcon from './icons/LeftThanIcon';
import GreatThanIcon from './icons/GreatThanIcon';

import style from './QuotesPagination.module.css';

const QuotesPagination = ({ currentPage, totalPages, setPage }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={style.paginationContainer}>
      <button
        className={style.paginationButton}
        aria-label='previous page'
        type='button'
        disabled={isFirstPage}
        onClick={() => setPage(currentPage - 1)}
      >
        <LeftThanIcon width='1.5rem' />
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={style.paginationButton}
        aria-label='next page'
        type='button'
        disabled={isLastPage}
        onClick={() => setPage(currentPage + 1)}
      >
        <GreatThanIcon width='1.5rem' />
      </button>
    </div>
  );
};

export default QuotesPagination;
