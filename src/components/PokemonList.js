// ! COMPONENTS
import Pokemon from './Pokemon';
import ButtonUp from './ButtonUp';
// ! FILES
import useFetch from '../useFetch';
import { useState, useRef, useCallback, useEffect } from 'react';

const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=';

const PokemonList = () => {
  const [offset, setOffset] = useState(0);
  const { isLoading, pokemons } = useFetch(`${url}${offset}`);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOffset((prev) => prev + 20);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return (
    <main className='container'>
      {isLoading && (
        <section className='loader'>
          <div className='pokemon-loader'></div>
        </section>
      )}
      <h1 className='title main-title'>Pokedex</h1>
      <section className='pokemon-container'>
        {pokemons.map((pokemon, i) => {
          return <Pokemon key={i} {...pokemon} />;
        })}
      </section>
      <footer className='footer'>
        <ButtonUp />
      </footer>

      <div ref={loader}></div>
    </main>
  );
};

export default PokemonList;
