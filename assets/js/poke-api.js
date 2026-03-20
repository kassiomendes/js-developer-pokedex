const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.species = pokeDetail.species.name;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  pokemon.abilities = pokeDetail.abilities.map((a) => a.ability.name);

  pokemon.stats = pokeDetail.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json()) //transformando a lista em uma nova lista de promessas do detalhe do pokemon(da nova requizição), ela vem original em uma lista de response
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemon = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url) //buscando no servidor a lista de pokemons
    .then((response) => response.json()) // gerado um http response e depois converter a lista para json
    .then((jsonBody) => jsonBody.results) //pegando a lista dentro de json
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeando a lista de pokemons em uma lista de requisiçoes dos detalhes dos pokemons
    .then((detailRequests) => Promise.all(detailRequests)) //lista de promessas a espera de ser resolvida, esperando q todas as listas terminem
    .then((pokemonsDetails) => pokemonsDetails); // gerado a lista de detalhe dos pokemons e retorna a lista
};

pokeApi.getPokemonById = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};
