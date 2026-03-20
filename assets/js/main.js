const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

const pokemonView = 1;

function openPokemonDetail(id) {
  window.location.href = `pokemon-details.html?id=${id}`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => ` 
<li class="pokemon ${pokemon.type}" onclick="openPokemonDetail(${pokemon.number})">
          <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
          <span class="name">${pokemon.name}</span>

          <div class="details">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>

            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>
        </li>
        `,
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordsWithNextPage = offset + limit;
  //condição para remover o botão de adicionar pokemons, caso atinga a quantidade limite de pokemons por pagina
  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton); //removendo o botão caso atinga o limite da pagina, parentElement pega o elemento pai e removeChild remove ele
  } else {
    loadPokemonItens(offset, limit);
  }
});
