//SELECTORS

const episodesList = document.querySelector(".episode-list");

let episodes = [];

const getEpisodes = async () => {
  try {
    const data = await fetch("https://api.tvmaze.com/shows/179/episodes");
    episodes = await data.json();
    displayEpisodes(episodes);
  } catch (err) {
    console.log(err);
  }
};

const displayEpisodes = (episode) => {
  const html = episode.map((item) => {
    const li = document.createElement("li");
    li.classList.add("list-items");
    const img = document.createElement("img");
    img.src = item.image.medium;

    const title = document.createElement("p");
    title.textContent = `${item.name} - S0${item.season}E0${item.number}`;
    const watchIcon = document.createElement("i");
    const timeIcon = document.createElement("i");
    watchIcon.classList.add("fa-solid", "fa-circle-play");
    timeIcon.classList.add("fa-solid", "fa-clock");
    li.append(img, title, watchIcon, timeIcon);
    episodesList.append(li);
  });
};

getEpisodes();
