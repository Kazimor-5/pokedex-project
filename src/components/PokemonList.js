// ! COMPONENTS
import Pokemon from './Pokemon';
import ButtonUp from './ButtonUp';
// ! FILES
import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1126';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const {
        data: { results },
      } = response;
      setPokemons(results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  if (isLoading) {
    return (
      <section className='loader'>
        <div className='pokemon-loader '></div>
      </section>
    );
  }

  return (
    <main className='container'>
      <h1 className='title main-title'>Pokedex</h1>
      <section className='pokemon-container'>
        {pokemons.map((pokemon) => {
          return <Pokemon {...pokemon} />;
        })}
      </section>
      <footer className='footer'>
        <ButtonUp />
      </footer>
    </main>
  );
};

export default PokemonList;
