import { useState } from 'react';
import Background from './components/Background'
import Logo from './components/Logo';
import Search from './components/Search';
import PokemonDetail from './components/PokemonDetail';
import PokemonList from './components/PokemonList';

/**
 * Main application component.
 * @returns {JSX.Element} The rendered application component.
 */
export default function App() {
  const [pokemon, setPokemon] = useState(null);

  return (
    <div>
      <Background />
      <Logo />
      <Search onSearch={setPokemon} curPokemon={pokemon} />
      {pokemon && <PokemonDetail curPokemon={pokemon} setPokemon={setPokemon} />}
      <PokemonList setPokemon={setPokemon} curPokemon={pokemon} />
    </div>
  );
}