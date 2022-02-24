import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios(url);
      const {
        data: { results },
      } = response;
      setPokemons((prev) => [...prev, ...results]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    getPokemons();
  }, [url, getPokemons]);

  return { pokemons, isLoading };
};

export default useFetch;
