// Pokemon API'sinden veri çekmek ve kart oluşturmak için kullanılan fonksiyonlar

const pokemonCount = 151; // Pokemon sayısı
const bgColor = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

// Pokemonları API'den çek ve kart oluştur
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

// ID'ye göre Pokemon bilgilerini API'den al
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data); // Verileri kullanarak kart oluştur
};

// API'den alınan verilerle Pokemon kartını DOM'a ekle
const createPokemonCard = (pokemon) => {
  const pokeContainer = document.querySelector(".poke-container");
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  // Pokemon ID'sini 3 haneli hale getirme
  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name; // Pokemon türü
  const pokemonBg = bgColor[pokemonType]; // Arka plan rengi
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  // Pokemon görseli ve kart bilgileri
  const pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;
  const pokemonInnerHtml = `
  <div class="image-container">
    <img
      src="${pokemonImage}"
      alt="Pokemon 1 image"
    />
  </div>
  <div class="poke-info">
    <span class="poke-id">#${pokemonId}</span>
    <h3 class="poke-name">${pokemon.name}</h3>
    <div class="small">
      <small class="poke-exp">
        <i class="fa-solid fa-flask"></i> <span>${pokemon.base_experience} Exp</span>
      </small>
      <small class="poke-weight">
        <i class="fa-solid fa-weight-scale"></i> <span>${pokemon.weight} Kg</span>
      </small>
    </div>
    <div class="poke-type">
      <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
    </div>
  </div>
  `;

  // Kartı ekrana ekle
  pokemonDiv.innerHTML = pokemonInnerHtml;
  pokeContainer.appendChild(pokemonDiv);
};

export { fetchPokemons };
