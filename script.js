//SELECTORS

const episodesList = document.querySelector(".episode-list");
const searchBar = document.querySelector("#search-input");

let episodes = [];

//getting data from API
const getEpisodes = async () => {
  try {
    const data = await fetch("https://api.tvmaze.com/shows/179/episodes");
    episodes = await data.json();
    displayEpisodes(episodes);
  } catch (err) {
    console.log(err);
  }
};

//displaying episodes on the page
const displayEpisodes = (episode) => {
  const html = episode.map((item) => {
    const li = document.createElement("li");
    li.classList.add("list-items");
    const img = document.createElement("img");
    img.src = item.image.medium;

    const title = document.createElement("p");
    title.innerText = `${item.name} - S0${item.season}E0${item.number}`;
    const watchIcon = document.createElement("i");
    const timeIcon = document.createElement("i");
    watchIcon.classList.add("fa-solid", "fa-circle-play");
    timeIcon.classList.add("fa-solid", "fa-clock");
    li.append(img, title, watchIcon, timeIcon);
    episodesList.append(li);
  });
};

getEpisodes();

// Live Search
searchBar.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const allEpisodes = document.getElementsByClassName("list-items");
  for (let i = 0; i < allEpisodes.length; i++) {
    if (!allEpisodes[i].innerText.toLowerCase().includes(searchValue)) {
      allEpisodes[i].style.display = "none";
    } else {
      allEpisodes[i].style.display = "block";
    }
  }
});
