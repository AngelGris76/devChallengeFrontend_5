const QuotesPagination = ({ currentPage, totalPages, setPage }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div>
      <button
        type='button'
        disabled={isFirstPage}
        onClick={() => setPage(currentPage - 1)}
      >
        Prev Page
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        type='button'
        disabled={isLastPage}
        onClick={() => setPage(currentPage + 1)}
      >
        Next Page
      </button>
    </div>
  );
};

export default QuotesPagination;
