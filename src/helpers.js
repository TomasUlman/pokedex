export const typeColors = {
    normal: "#A8A77A",  // Jemnější béžová
    fighting: "#9E2A2B", // Sytě červená
    flying: "#82CAFF",   // Nebesky modrá
    poison: "#9D5B9B",   // Živější fialová
    ground: "#E0C068",   // Písečná žlutá
    rock: "#B8A038",     // Zlatohnědá
    bug: "#A8B820",      // Jasná zeleno-žlutá
    ghost: "#705898",    // Magická fialová
    steel: "#60A1B8",    // Světle modrošedá
    fire: "#FF5733",     // Ohnivě oranžová
    water: "#3399FF",    // Sytá modrá
    grass: "#4CAF50",    // Živá zelená
    electric: "#FFD700", // Zlatě žlutá
    psychic: "#F85888",  // Růžová s nádechem červené
    ice: "#79CDCD",      // Světle tyrkysová
    dragon: "#6F35FC",   // Sytá fialová
    dark: "#4A412A",     // Tmavě hnědá
    fairy: "#FF77FF",    // Jasně růžová
    stellar: "#FFB6C1",  // Světle růžová (dočasná barva)
    unknown: "#999999",  // Šedá pro placeholder
};

/**
 * Fetches Pokémon data and evolution details.
 * @param {string|number} idOrName - The ID or name of the Pokémon.
 * @param {Object} curPokemon - The current Pokémon data.
 * @returns {Promise<Object>} The fetched Pokémon data with evolution details.
 * @throws {Error} If fetching data fails.
 */
export async function fetchPokemon(idOrName, curPokemon) {
    try {
        const data = await fetchPokemonData(idOrName);
        console.log(data);

        const evolutionChainData = await fetchEvolutionChain(data.species.url);

        let updatedEvolutions = [];

        if (curPokemon && curPokemon.evolutionChainId === evolutionChainData.id)
            updatedEvolutions = curPokemon.evolutions;

        if (!curPokemon || curPokemon.evolutionChainId !== evolutionChainData.id) {
            const evolutions = extractEvolutions(evolutionChainData.chain);

            updatedEvolutions = evolutions.length > 1
                ? await fetchEvolutionDetails(evolutions)
                : [];
        }

        return {
            id: data.id,
            name: data.name,
            height: `${data.height / 10} m`,
            weight: `${data.weight / 10} kg`,
            image: data.sprites.other['official-artwork'].front_default,
            types: data.types.map(type => type.type.name),
            evolutionChainId: evolutionChainData.id,
            evolutions: updatedEvolutions,
        };
    } catch (err) {
        throw new Error(err.message);
    }
}

/**
 * Fetches Pokémon data from the API.
 * @param {string|number} id - The ID or name of the Pokémon.
 * @returns {Promise<Object>} The fetched Pokémon data.
 * @throws {Error} If the Pokémon is not found.
 */
async function fetchPokemonData(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Pokémon not found');
    return await res.json();
}

/**
 * Fetches the evolution chain data from the API.
 * @param {string} speciesUrl - The URL of the Pokémon species.
 * @returns {Promise<Object>} The fetched evolution chain data.
 */
async function fetchEvolutionChain(speciesUrl) {
    const speciesRes = await fetch(speciesUrl);
    const speciesData = await speciesRes.json();

    const evolutionChainRes = await fetch(speciesData.evolution_chain.url);

    return await evolutionChainRes.json();
}

/**
 * Fetches the details of Pokémon evolutions.
 * @param {Array<string>} evolutions - The list of Pokémon names in the evolution chain.
 * @returns {Promise<Array<Object>>} The fetched evolution details.
 */
async function fetchEvolutionDetails(evolutions) {
    return await Promise.all(
        evolutions.map(async (pokemon) => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

                if (!res.ok) {
                    console.warn(`Pokémon ${pokemon} nebyl nalezen (HTTP ${res.status})`);
                    return null;
                }

                const data = await res.json();

                return {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other['official-artwork'].front_default,
                };
            } catch (error) {
                console.error(`Chyba při načítání evoluce ${pokemon}:`, error);
                return null;
            }
        })
    ).then(results => results.filter(Boolean));
}

/**
 * Fetches multiple Pokémon data from the API.
 * @param {string} [url='https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'] - The URL to fetch the Pokémon data from.
 * @returns {Promise<Object>} An object containing the next URL, previous URL, and the list of fetched Pokémon data.
 * @throws {Error} If fetching data fails.
 */
export async function fetchMultiplePokemons(url) {
    try {
        const data = await fetch(url);
        const res = await data.json();
        const list = await Promise.all(
            res.results.map(async (result) => {
                const pokemonData = await fetchPokemonData(result.name);
                return {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    types: pokemonData.types.map(type => type.type.name),
                    image: pokemonData.sprites.other['official-artwork'].front_default
                }
            }));
        return {
            nextUrl: res.next,
            previousUrl: res.previous,
            pokemons: list
        }
    } catch (err) {
        console.error(err.message);
    }
}

/**
 * Extracts the evolution chain from the evolution chain data.
 * @param {Object} chain - The evolution chain data.
 * @returns {Array<string>} The list of Pokémon names in the evolution chain.
 */
function extractEvolutions(chain) {
    const evolutions = [];

    function traverse(node) {
        if (!node) return;
        evolutions.push(node.species.name);
        node.evolves_to.forEach(traverse);
    }

    traverse(chain);
    return evolutions;
}