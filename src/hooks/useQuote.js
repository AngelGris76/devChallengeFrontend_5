import { useEffect, useState } from 'react';
import fetchData from '../lib/fetchData';

const useQuote = (filter) => {
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
    getQuote(controller.signal, filter, setQuote);

    return () => controller.abort();
  }, [filter, quote]);

  return { quote, setLoading };
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

export default useQuote;
