const baseUrl = `https://swapi2.azurewebsites.net/api`;

let titleH1;
let director;
let releaseDate;
let openingCrawl;
let characters;
let planets;
// Runs on page load
addEventListener("DOMContentLoaded", () => {
  titleH1 = document.querySelector("h1#title");
  director = document.querySelector("span#director");
  releaseDate = document.querySelector("span#releaseDate");
  openingCrawl = document.querySelector("span#openingCrawl");
  characters = document.querySelector("#characters>ul");
  planets = document.querySelector("#planets>ul");

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    // character array
    film.characters = await fetchCharacters(id);
    // planet array
    film.planets = await fetchPlanets(id);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/films/${id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchPlanets(id) {
  const url = `${baseUrl}/films/${id}/planets`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.name}`; // Just to make the browser tab say movie title

  titleH1.textContent = film?.title;
  director.textContent = film?.director;
  openingCrawl.textContent = film?.opening_crawl;
  releaseDate.textContent = film?.release_date;
  const characterLis = film?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  characters.innerHTML = characterLis.join("");
  const planetLis = film?.planets?.map(
    (planet) => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`
  );
  planets.innerHTML = planetLis.join("");
};
