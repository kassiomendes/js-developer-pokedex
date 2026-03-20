const pokemonDetails = document.getElementById("pokemonDetails");

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

if (pokemonId) {
  pokeApi.getPokemonById(pokemonId).then((pokemon) => {
    const html = `
      <div class="detail-card ${pokemon.type}">
        
        <div class="top">
        
          <div class="top-icons">
          <button class="back-btn" onclick="goBack()">←</button>
          <button class="fav-btn" onclick="toggleFavorite(${pokemon.number})">♡</button>
          </div>
          <span class="number">#${String(pokemon.number).padStart(3, "0")}</span>
          <h1 class="name">${pokemon.name}</h1>

          <div class="details">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>

          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>

        <div class="bottom">

          <div class="tabs">
            <button onclick="showTab('about')">About</button>
            <button onclick="showTab('stats')">Stats</button>
          </div>

          <div id="about" class="tab-content active">
          <p><strong>Species: </strong> ${pokemon.species}</p>
            <p><strong>Height: </strong> ${pokemon.height}</p>
            <p><strong>Weight: </strong> ${pokemon.weight}</p>
            <p><strong>Abilities: </strong> ${pokemon.abilities.join(", ")}</p>
          </div>

          <div id="stats" class="tab-content">
            ${pokemon.stats
              .map(
                (stat) => `
              <div class="stat">
                <span>${stat.name}</span>
                <div class="bar">
                  <div style="width: ${stat.value}%"></div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>

        </div>
      </div>
    `;

    pokemonDetails.innerHTML = html;
  });
}

function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach((el) => {
    el.classList.remove("active");
  });

  document.getElementById(tab).classList.add("active");
}
function goBack() {
  window.history.back();
}

function toggleFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  updateFavoriteIcon(id);
}

function updateFavoriteIcon(id) {
  const btn = document.querySelector(".fav-btn");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(id)) {
    btn.textContent = "❤️"; // preenchido
  } else {
    btn.textContent = "🤍"; // vazio
  }
}