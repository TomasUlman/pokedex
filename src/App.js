import { useState } from 'react';
import Background from './components/Background'
import Logo from './components/Logo';
import Search from './components/Search';
import PokemonDetail from './components/PokemonDetail';
import PokemonList from './components/PokemonList';
import Loader from './components/Loader';
import { fetchPokemon } from './helpers';

/**
 * Main application component.
 * @returns {JSX.Element} The rendered application component.
 */
export default function App() {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles setting the current Pokémon by fetching new data.
   * @param {string|number} nameOrId - The name or ID of the Pokémon to fetch.
   * @param {Function} setError - Function to set an error message if fetching fails.
   * @returns {Promise<void>}
   */
  async function handleSetPokemon(nameOrId, setError = null) {
    try {
      setIsLoading(true);
      const startTime = Date.now(); // Request start time

      const newPokemon = await fetchPokemon(nameOrId, pokemon);

      const elapsedTime = Date.now() - startTime; // Time duration of request
      const minLoadTime = 500; // Minimal loading time (500ms)

      setTimeout(() => {
        setPokemon(newPokemon);
        setIsLoading(false);
      }, Math.max(minLoadTime - elapsedTime, 0)); // If 500 ms elapsed, setPokemon immediately
    } catch (err) {
      if (setError) setError(err.message);
      setPokemon(null);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Background />
      <Logo />
      <Search onSearch={handleSetPokemon} curPokemon={pokemon} />
      {isLoading && <Loader />}
      {pokemon && !isLoading && <PokemonDetail curPokemon={pokemon} onChangePokemon={handleSetPokemon} />}
      <PokemonList onChangePokemon={handleSetPokemon} curPokemon={pokemon} />
    </div>
  );
}