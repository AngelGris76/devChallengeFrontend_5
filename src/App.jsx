import RefreshIcon from './components/icons/RefreshIcon';
import QuoteList from './components/QuoteList';
import SingleQuote from './components/SingleQuote';
import useQuote from './hooks/useQuote';
import useQuoteFilter from './hooks/useQuoteFilter';

import style from './App.module.css';

const App = () => {
  const { quoteFilter, resetFilter, setAuthor, setPage } = useQuoteFilter();
  const { quote, setLoading } = useQuote(quoteFilter);

  return (
    <div className={style.main}>
      <button
        onClick={() => {
          resetFilter();
          setLoading();
        }}
      >
        Refresh <RefreshIcon width='24px' />
      </button>
      {quoteFilter.limit === 1 && (
        <SingleQuote
          isLoading={quote.isLoading}
          quote={quote.data}
          setAuthor={(author) => {
            setAuthor(author);
            setLoading();
          }}
        />
      )}
      {quoteFilter.limit > 1 && (
        <QuoteList
          quotes={quote}
          setPage={(page) => {
            setPage(page);
            setLoading();
          }}
        />
      )}
    </div>
  );
};

export default App;
