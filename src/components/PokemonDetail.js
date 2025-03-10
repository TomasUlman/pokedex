import { typeColors } from "../helpers";

/**
 * Component to display the details of a Pokémon.
 * @param {Object} props - The component props.
 * @param {Object} props.curPokemon - The current Pokémon data.
 * @param {Function} props.setPokemon - Function to set the current Pokémon.
 * @returns {JSX.Element} The rendered Pokémon detail component.
 */
export default function PokemonDetail({ curPokemon, onChangePokemon }) {
    return (
        <div className='pokemon-display'>
            <PokemonHeader pokemon={curPokemon} onChangePokemon={onChangePokemon} />
            <div className='pokemon-detail'>
                <PokemonEvolutions pokemon={curPokemon} onChangePokemon={onChangePokemon} />
                <PokemonAvatar pokemon={curPokemon} />
                <PokemonOverview pokemon={curPokemon} />
            </div>
        </div>
    );
}

/**
 * Component to display the header of the Pokémon detail.
 * @param {Object} props - The component props.
 * @param {Object} props.pokemon - The current Pokémon data.
 * @param {Function} props.onChangePokemon - Function to change the current Pokémon.
 * @returns {JSX.Element} The rendered Pokémon header component.
 */
function PokemonHeader({ pokemon, onChangePokemon }) {
    return (
        <div className='pokemon-header'>
            <span
                className={pokemon.id === 1 ? 'hidden' : ''}
                onClick={() => onChangePokemon(pokemon.id - 1)}
            >&larr;
            </span>
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <span
                className={pokemon.id === 1025 ? 'hidden' : ''}
                onClick={() => onChangePokemon(pokemon.id + 1)}
            >&rarr;
            </span>
        </div>
    );
}

/**
 * Component to display the evolutions of the Pokémon.
 * @param {Object} props - The component props.
 * @param {Object} props.pokemon - The current Pokémon data.
 * @param {Function} props.onChangePokemon - Function to change the current Pokémon.
 * @returns {JSX.Element} The rendered Pokémon evolutions component.
 */
function PokemonEvolutions({ pokemon, onChangePokemon }) {
    return (
        <div className='pokemon-evolutions'>
            <h2>Evolutions</h2>
            {pokemon.evolutions.length ? (
                <div className='evolutions-container'>
                    {pokemon.evolutions.map(pokemon => (
                        <div className='evolution' key={pokemon.id}>
                            <img
                                src={pokemon.image}
                                alt={pokemon.name}
                                onClick={() => onChangePokemon(pokemon.id)}
                            />
                            <span>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>This pokemon doesn't evolve.</p>
            )
            }
        </div>
    );
}

/**
 * Component to display the avatar of the Pokémon.
 * @param {Object} props - The component props.
 * @param {Object} props.pokemon - The current Pokémon data.
 * @returns {JSX.Element} The rendered Pokémon avatar component.
 */
function PokemonAvatar({ pokemon }) {
    return (
        <div className='pokemon-avatar'>
            <img src={pokemon.image} alt={pokemon.name} />
        </div>
    );
}

/**
 * Component to display the overview of the Pokémon.
 * @param {Object} props - The component props.
 * @param {Object} props.pokemon - The current Pokémon data.
 * @returns {JSX.Element} The rendered Pokémon overview component.
 */
function PokemonOverview({ pokemon }) {
    return (
        <div className='pokemon-overview'>
            <div className='overview-group'>
                <h4>ID</h4>
                <span>{pokemon.id}</span>
            </div>
            <div className='types-container'>
                {pokemon.types.map((type, index) =>
                    <span
                        className='pokemon-type'
                        key={index}
                        style={{ backgroundColor: typeColors[type] }}
                    >{type}
                    </span>
                )}
            </div>
            <div className='overview-group'>
                <h4>Height</h4>
                <span>{pokemon.height}</span>
            </div>
            <div className='overview-group'>
                <h4>Weight</h4>
                <span>{pokemon.weight}</span>
            </div>
        </div>
    );
}