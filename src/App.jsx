import { useState, useEffect } from 'react';
import RefreshIcon from './components/icons/RefreshIcon';
import QuoteList from './components/QuoteList';
import SingleQuote from './components/SingleQuote';

const randomPage = (limit) => {
  let result;
  do {
    result = Math.floor(Math.random() * 10000);
  } while (result > limit);
  return result;
};

const App = () => {
  const [quoteFilter, setQuoteFilter] = useState({
    author: '',
    limit: 1,
    page: randomPage(7280),
  });

  const resetFilter = () =>
    setQuoteFilter({ author: '', limit: 1, page: randomPage(7280) });

  const setAuthor = (author) =>
    setQuoteFilter({ ...quoteFilter, limit: 10, author, page: 1 });

  const setPage = (page) => setQuoteFilter({ ...quoteFilter, page });

  const [quote, setQuote] = useState({
    data: null,
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
  });

  const setLoading = () =>
    setQuote((prevQuote) => ({ ...prevQuote, isLoading: true }));

  useEffect(() => {
    setLoading();
  }, []);

  useEffect(() => {
    if (!quote.isLoading) return;

    const controller = new AbortController();
    getQuote(controller.signal, quoteFilter, setQuote);

    return () => controller.abort();
  }, [quoteFilter, quote]);

  return (
    <div>
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

const getQuote = async (signal, filter, setQuote) => {
  const { error, data, currentPage, totalPages } = await fetchData(
    signal,
    filter
  );

  if (error)
    return setQuote({
      data: [],
      currentPage: 1,
      totalPages: 1,
      error,
      isLoading: false,
    });

  setQuote({
    data,
    currentPage,
    totalPages,
    isLoading: false,
  });
};

const fetchData = async (signal, filter) => {
  const API_URL = new URL('https://quote-garden.herokuapp.com/api/v3/quotes');

  if (filter.page) {
    API_URL.searchParams.append('page', filter.page);
  }

  if (filter.author) {
    API_URL.searchParams.append('author', filter.author);
  }

  if (filter.limit > 1) {
    API_URL.searchParams.append('limit', filter.limit);
  } else {
    API_URL.searchParams.append('limit', '1');
  }

  try {
    const response = await fetch(API_URL, { signal });
    if (!response.ok) throw new Error('Server error');
    const responseData = await response.json();

    return {
      error: null,
      data: responseData.data,
      currentPage: responseData.pagination.currentPage,
      totalPages: responseData.pagination.totalPages,
    };
  } catch (err) {
    if (err.name !== 'AbortError') return { error: err.message };

    return { error: null, data: null, currentPage: 1, totalPages: 1 };
  }
};

export default App;
