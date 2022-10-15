import QuotesPagination from './QuotesPagination';

import style from './QuoteList.module.css';

const QuoteList = ({ quotes, setPage }) => {
  const renderedQuotes = quotesToRender(quotes.data);

  return (
    <div className={style.container}>
      <h2 className={style.quoteAuthor}>{quotes.data[0].quoteAuthor}</h2>

      {quotes.isLoading && <p>Loading...</p>}

      {!quotes.isLoading && (
        <>
          <ul className={style.quoteList}>{renderedQuotes}</ul>
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
    <li className={style.quoteItem} key={_id}>
      <blockquote className={style.quote}>{`"${quoteText}"`}</blockquote>
    </li>
  ));
};

export default QuoteList;
