import { useState } from 'react';

const useQuoteFilter = () => {
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

  return { quoteFilter, resetFilter, setAuthor, setPage };
};

const randomPage = (limit) => {
  let result;
  do {
    result = Math.floor(Math.random() * 10000);
  } while (result > limit);
  return result;
};

export default useQuoteFilter;
