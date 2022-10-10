import QuotesPagination from './QuotesPagination';

const QuoteList = ({ quotes, setPage }) => {
  const renderedQuotes = quotesToRender(quotes.data);

  return (
    <div>
      <h2>{quotes.data[0].quoteAuthor}</h2>

      {quotes.isLoading && <p>Loading...</p>}

      {!quotes.isLoading && (
        <>
          <ul>{renderedQuotes}</ul>
          <QuotesPagination
            currentPage={quotes.currentPage}
            totalPages={quotes.totalPages}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
};

const quotesToRender = (quotes) => {
  if (!quotes) return null;
  return quotes.map(({ _id, quoteText }) => (
    <li key={_id}>
      <blockquote>{quoteText}</blockquote>
    </li>
  ));
};

export default QuoteList;
