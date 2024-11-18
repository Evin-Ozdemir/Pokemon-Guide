import { fetchPokemons } from "./api.js"; // API fonksiyonlarını içe aktar

const search = document.querySelector(".search");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");

// Sayfa yüklendiğinde çalıştırılacak işlemler
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme"); // Kaydedilen temayı kontrol et
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const themeIcon = document.querySelector("#toggle-theme i");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
  fetchPokemons(); // Pokemonları getir
});

// Arama kutusunun görünürlük durumunu değiştir
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

// Arama kutusundaki yazıya göre kartları filtrele
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  pokemonNames.forEach((pokemonName) => {
    const pokemonCard = pokemonName.parentElement.parentElement; // Kart öğesine erişim
    if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonCard.style.display = "block"; // Eşleşen kartı göster
    } else {
      pokemonCard.style.display = "none"; // Eşleşmeyen kartı gizle
    }
  });
});

// Tema değiştirme
document.getElementById("toggle-theme").addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  const themeIcon = document.querySelector("#toggle-theme i");
  if (isDarkMode) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
});
