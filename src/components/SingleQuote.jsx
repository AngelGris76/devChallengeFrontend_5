import ArrowRightIcon from './icons/ArrowRightIcon';
import style from './SingleQuote.module.css';

const SingleQuote = ({ isLoading, quote, setAuthor }) => {
  if (isLoading) return <p>Loading...</p>;
  if (!quote) return null;
  if (!quote.length) return <p>No quotes to show</p>;

  const { quoteText, quoteAuthor, quoteGenre } = quote[0];
  return (
    <div className={style.quoteContainer}>
      <blockquote className={style.quote}>{`"${quoteText}"`}</blockquote>
      <button
        className={style.authorButton}
        aria-label='get all quot form this author'
        onClick={() => setAuthor(quoteAuthor)}
      >
        <span className={style.authorInfo}>
          <span className={style.quoteAuthor}>{quoteAuthor}</span>
          <span className={style.quoteGenre}>{quoteGenre}</span>
        </span>
        <ArrowRightIcon width='1.5rem' color='rgb(242,242,242)' />
      </button>
    </div>
  );
};

export default SingleQuote;
