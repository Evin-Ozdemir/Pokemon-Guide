const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");

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

document.addEventListener("DOMContentLoaded", () => {
  // Sayfa yüklendiğinde, önceden kaydedilen tema ayarını kontrol et
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const themeIcon = document.querySelector("#toggle-theme i");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
  fetchPokemons(); // Sayfa yüklendiğinde Pokemon'ları getir
});

// Search e tıklandığında acılıp kapanmasını sağlanır
searchBtn.addEventListener("click", () => {
  // Arama kutusunun görünürlük durumunu değiştirir
  search.classList.toggle("active");
});

//
const fetchPokemons = async () => {
  // Pokemon'ları çekmek için döngü
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i); // Her bir Pokemon için getPokemon fonksiyonu çağırılır
  }
};

//
const getPokemon = async (id) => {
  // Pokemon API'sinden veri çekme
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json(); // JSON formatında gelen veriyi al
  createPokemonCard(data); // Alınan veriyi kart olarak oluştur
};

const createPokemonCard = (pokemon) => {
  // Pokemon bilgilerini içeren kart oluşturma
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  // Pokemon ID'sini 3 haneli hale getirme (Örn: 001, 025)
  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name; // Pokemon türünü al
  const pokemonBg = bgColor[pokemonType]; // Pokemon türüne göre arka plan rengi
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  // Pokemon görselini URL üzerinden çekme
  const pokemonImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;

  // Pokemon kartının HTML içeriği
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
            <small class="poke-exp"
              ><i class="fa-solid fa-flask"></i> <span>${pokemon.base_experience} Exp</span></small
            >
            <small class="poke-weight"
              ><i class="fa-solid fa-weight-scale"></i> <span>${pokemon.weight} Kg</span></small
            >
          </div>
          <div class="poke-type"></d>
            <i class="fa-brands fa-uncharted"></i> <span>${pokemonType}</span>
          </h5>
        </div>
  `;

  // Kartı DOM'a ekle
  pokemonDiv.innerHTML = pokemonInnerHtml;
  pokeContainer.appendChild(pokemonDiv);
};

// Arama kutusunun her yazı girişinde arama işlemi yapılır
searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLowerCase(); // Arama kutusundaki yazıyı al
  const pokemonNames = document.querySelectorAll(".poke-name"); // Tüm Pokemon isimlerini al

  pokemonNames.forEach((pokemonName) => {
    const pokemonCard = pokemonName.parentElement.parentElement; // Kart öğesine erişim
    if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonCard.style.display = "block"; // Arama terimiyle eşleşen kartı göster
    } else {
      pokemonCard.style.display = "none"; // Eşleşmeyen kartı gizle
    }
  });
});

// Tema ayarları
document.getElementById("toggle-theme").addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode"); // Dark mode aç/kapat
  localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Tema durumunu localStorage'a kaydet

  // İkonu değiştirme
  const themeIcon = document.querySelector("#toggle-theme i");
  if (isDarkMode) {
    themeIcon.classList.remove("fa-sun"); // Karanlık moddaysa güneş ikonunu kaldır
    themeIcon.classList.add("fa-moon"); // Ay ikonunu ekle
  } else {
    themeIcon.classList.remove("fa-moon"); // Aydınlık moddaysa ay ikonunu kaldır
    themeIcon.classList.add("fa-sun"); // Güneş ikonunu ekle
  }
});
