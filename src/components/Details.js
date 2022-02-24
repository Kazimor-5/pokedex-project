// ! FILES
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const url = 'https://pokeapi.co/api/v2/pokemon/';

const Details = () => {
  const [singlePokemon, setSinglePokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getSinglePokemon = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(`${url}${id}`);
    const { data } = response;

    const ability1 = data.abilities[0].ability.name;
    const ability2 = data.abilities[1].ability.name;
    const { weight, height, name, types } = data;
    const type1 = types[0].type.name;
    const type2 = types[1] && types[1].type.name;
    const img = data.sprites.front_default;
    const stats = data.stats.map((item) => {
      const {
        base_stat,
        stat: { name: name_stat },
      } = item;
      return { base_stat, name_stat };
    });
    const newData = {
      ability1,
      ability2,
      weight,
      height,
      name,
      img,
      type1,
      type2,
      stats,
    };
    setSinglePokemon(newData);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    getSinglePokemon();
  }, [getSinglePokemon]);

  if (isLoading) {
    return (
      <section className='loader'>
        <div className='pokemon-loader '></div>
      </section>
    );
  }

  const { ability1, ability2, weight, height, name, img, type1, type2, stats } =
    singlePokemon;
  return (
    <section className='single-pokemon-container'>
      <article className='single-pokemon'>
        <Link className='back' to='/'>
          back home
        </Link>
        <h3 className='name title'>{name}</h3>
        <div className='single-img-container'>
          <img src={img} alt={name} className='single-img img' />
        </div>
        <div className='content'>
          <div className='single-pokemon-type type'>
            <p>
              Types:{' '}
              <span className='types'>
                {type1} {type2 && type2}
              </span>
            </p>
            <p className='single-pokemon-abilities abilities'>
              Abilities:{' '}
              <span className='ability'>
                {ability1} {ability2 && ability2}
              </span>
            </p>
            <div className='morphology'>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
            </div>
          </div>
          <div className='stats'>
            <p>Stats:</p>
            {stats &&
              stats.map((item) => {
                const { base_stat, name_stat } = item;
                return (
                  <p className='stat'>
                    {name_stat}: <span>{base_stat}</span>
                  </p>
                );
              })}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Details;
