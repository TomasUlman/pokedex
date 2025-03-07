import { useState } from 'react';
import { fetchPokemon } from '../helpers';

/**
 * Search component to search for a Pokémon by name.
 * @param {Object} props - The component props.
 * @param {Function} props.onSearch - Function to handle the search result.
 * @param {Object} props.curPokemon - The current Pokémon data.
 * @returns {JSX.Element} The rendered search component.
 */
export default function Search({ onSearch, curPokemon }) {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    /**
     * Handles the form submission to search for a Pokémon.
     * @param {Event} e - The form submission event.
     * @returns {Promise<void>}
     */
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            setError(null);

            if (!query) return;

            const pokemon = await fetchPokemon(query, curPokemon);

            onSearch(pokemon);
            setQuery('');
        } catch (err) {
            setError(err.message);
            onSearch(null);
        }
    }

    return (
        <form className='searchbar' onSubmit={handleSubmit}>
            <div className='searchbar-elements'>
                <span className='searchbar-header'>Search by name</span>
                <div className='input-container'>
                    <input type='text' value={query} onChange={e => {
                        setError(null);
                        setQuery(e.target.value)
                    }} />
                    <span className='search-icon' onClick={handleSubmit}>🔍</span>
                </div>
                {error && <span className='error-message'>{error}</span>}
            </div>
        </form>
    );
}
