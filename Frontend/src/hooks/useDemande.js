import { useState, useEffect } from 'react';

const useDemande = (requestFunc, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await requestFunc();
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [requestFunc]);

  return { data, loading, error };
};

export default useDemande;
