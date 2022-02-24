// ! FILES
import { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pokemon = ({ url }) => {
  const [pokemon, setPokemon] = useState([]);

  const getPokemon = useCallback(async () => {
    const response = await axios.get(url);
    const { data } = response;

    const { id, name, types } = data;
    const type1 = types[0].type.name;
    const type2 = types[1] && types[1].type.name;
    const img = data.sprites.front_default;
    const newData = {
      id,
      name,
      img,
      type1,
      type2,
    };
    setPokemon(newData);
  }, [url]);

  useEffect(() => {
    getPokemon();
  }, [url, getPokemon]);

  const { id, name, img, type1, type2 } = pokemon;
  return (
    <div className='pokemon-card' key={id}>
      <article className='card'>
        <h3 className='name title'>{name}</h3>
        <div className='img-container'>
          <img src={img} alt={name} className='img' />
        </div>
        <p className='types'>
          Types:{' '}
          <span className='types'>
            {type1} {type2 && type2}
          </span>
        </p>
        <Link to={`/pokemon/${id}`} className='details'>
          Details
        </Link>
      </article>
    </div>
  );
};

export default Pokemon;
