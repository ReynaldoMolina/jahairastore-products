import { useEffect, useState } from 'react';

function useGetData() {
  const url = 'https://jahairastore-api.vercel.app/api/v1/productspage/';
  // const url = 'http://192.168.1.7:3001/api/v1/productspage';

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        console.log('Error ocurred when fetching data', err);
        setError(true);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export { useGetData };
