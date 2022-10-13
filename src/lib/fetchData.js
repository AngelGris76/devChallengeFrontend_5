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

export default fetchData;
