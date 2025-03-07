import { useState, useEffect, useRef } from 'react';
import { fetchPokemon, fetchMultiplePokemons, typeColors } from '../helpers';

/**
 * Fetches and sets the Pokémon data.
 * @param {Function} setPokemons - Function to set the Pokémon data.
 * @param {Function} setNextListUrl - Function to set the next list URL.
 * @param {string} nextListUrl - The URL to fetch the next list of Pokémon.
 * @param {Array<Object>} [prevPokemons=[]] - The previous list of Pokémon.
 * @returns {Promise<void>}
 */
async function fetchAndSetPokemons(setPokemons, setNextListUrl, nextListUrl, prevPokemons = []) {
    const data = await fetchMultiplePokemons(nextListUrl);
    setPokemons(prevPokemons => [...prevPokemons, ...data.pokemons]);
    setNextListUrl(data.nextUrl);
}

/**
 * PokemonList component to display a list of Pokémon.
 * @param {Object} props - The component props.
 * @param {Function} props.setPokemon - Function to set the current Pokémon.
 * @param {Object} props.curPokemon - The current Pokémon data.
 * @returns {JSX.Element} The rendered Pokémon list component.
 */
export default function PokemonList({ setPokemon, curPokemon }) {
    const [pokemons, setPokemons] = useState([]);
    const [nextListUrl, setNextListUrl] = useState(null);
    const effectRun = useRef(false);

    useEffect(() => {
        if (!effectRun.current) {
            effectRun.current = true;
            fetchAndSetPokemons(setPokemons, setNextListUrl, 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');
        }
    }, []);

    /**
     * Changes the current Pokémon by fetching new data.
     * @param {number} id - The ID of the new Pokémon.
     * @returns {Promise<void>}
     */
    async function changePokemon(id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const newPokemon = await fetchPokemon(id, curPokemon);
        setPokemon(newPokemon);
    }

    return (
        <div className='pokemon-list'>
            <div className='pokemon-list-container'>
                {pokemons.map(pokemon =>
                    <div
                        className='pokemon-list-item'
                        key={pokemon.id}
                        onClick={() => changePokemon(pokemon.id)}
                    >
                        <img src={pokemon.image} alt={pokemon.name} />
                        <span className='pokemon-item-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                        <div className='pokemon-item-types-container'>
                            {pokemon.types.map((type, index) =>
                                <span key={index} className='pokemon-item-type' style={{ backgroundColor: typeColors[type] }}>
                                    {type}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <span
                onClick={() => fetchAndSetPokemons(setPokemons, setNextListUrl, nextListUrl, pokemons)}
                className='load-more-btn'
            >
                Load more pokemons...
            </span>
        </div>
    );
}
