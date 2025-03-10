import { useState } from 'react';

/**
 * Search component to search for a Pokémon by name.
 * @param {Object} props - The component props.
 * @param {Function} props.onSearch - Function to handle the search result.
 * @returns {JSX.Element} The rendered search component.
 */
export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    /**
     * Handles the form submission to search for a Pokémon.
     * @param {Event} e - The form submission event.
     */
    function handleSubmit(e) {
        e.preventDefault();

        setError(null);

        if (!query) return;

        onSearch(query.toLowerCase().trim(), setError);
        setQuery('');
    }

    return (
        <form className='searchbar' onSubmit={handleSubmit}>
            <div className='searchbar-elements'>
                <span className='searchbar-header'>Search by name or ID</span>
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
