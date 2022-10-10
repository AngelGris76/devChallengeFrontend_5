const SingleQuote = ({ isLoading, quote, setAuthor }) => {
  if (isLoading) return <p>Loading...</p>;
  if (!quote) return null;
  if (!quote.length) return <p>No quotes to show</p>;

  const { quoteText, quoteAuthor, quoteGenre } = quote[0];
  return (
    <div>
      <blockquote>{quoteText}</blockquote>
      <button onClick={() => setAuthor(quoteAuthor)}>
        <span>{quoteAuthor}</span>
        <span> {quoteGenre}</span>
      </button>
    </div>
  );
};

export default SingleQuote;
