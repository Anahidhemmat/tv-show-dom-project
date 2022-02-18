//SELECTORS

const episodesList = document.querySelector(".episode-list");
const searchBar = document.querySelector("#search-input");
const selectElement = document.querySelector("#select-episode");
const searchIcon = document.querySelector(".search-icon");

let episodes = [];

//getting data from API
const getEpisodes = async () => {
  try {
    episodes = await fetch("https://api.tvmaze.com/shows/179/episodes").then(
      (data) => data.json()
    );

    displayEpisodes(episodes);
    console.log(episodes);
  } catch (err) {
    console.log(err);
  }
};
getEpisodes();

//displaying episodes on the page
const displayEpisodes = (episode) => {
  episode.map((item) => {
    //Create list items
    const li = document.createElement("li");
    li.classList.add("list-items");
    li.id = item.id;

    //Create image element
    const img = document.createElement("img");
    img.src = item.image.medium;

    //create div element for img & summery
    const div = document.createElement("div");
    div.classList.add("img-sum");
    //create title & episode
    const title = document.createElement("p");
    if (item.number <= 9) {
      title.innerText = `${item.name} - S0${item.season}E0${item.number}`;
    } else {
      title.innerText = `${item.name} - S0${item.season}E${item.number}`;
    }

    //create icons elements
    const watchIcon = document.createElement("i");
    const timeIcon = document.createElement("i");
    watchIcon.classList.add("fa-solid", "fa-circle-play");
    timeIcon.classList.add("fa-solid", "fa-clock");

    //create icon link element
    const span = document.createElement("span");
    const watchLink = document.createElement("a");
    watchLink.href = item.url;
    watchLink.innerText = `Wanna Watch?`;
    watchLink.classList.add("watch-link");
    span.addEventListener("mouseover", () => {
      watchLink.classList.remove("watch-link");
    });
    span.addEventListener("mouseleave", () => {
      watchLink.classList.add("watch-link");
    });

    //create watch time span element
    const span2 = document.createElement("span");
    const watchTime = document.createElement("span");
    watchTime.innerText = `airtime:${item.airtime}`;
    watchTime.classList.add("watch-link");
    span2.addEventListener("mouseover", () => {
      watchTime.classList.remove("watch-link");
    });
    span2.addEventListener("mouseleave", () => {
      watchTime.classList.add("watch-link");
    });
    //create option elements
    const optionElement = document.createElement("option");
    if (item.number <= 9) {
      optionElement.innerText = `S0${item.season}E0${item.number} - ${item.name}`;
    } else {
      optionElement.innerText = `S0${item.season}E${item.number} - ${item.name}`;
    }
    optionElement.value = item.id;

    //summery part
    const summery = document.createElement("div");
    summery.classList.add("episode-summery");
    const episodeSummary = item.summary
      .replace("<p>", "")
      .split(" ")
      .slice(0, 12)
      .join(" ");
    summery.innerHTML = `${episodeSummary}...`;

    //append
    li.append(div, title, span, span2, summery);
    span.append(watchIcon, watchLink);
    span2.append(timeIcon, watchTime);
    episodesList.append(li);
    selectElement.append(optionElement);
    div.append(img, summery);

    //select eventlistener
    selectElement.addEventListener("change", (e) => {
      const allEpisodes = document.getElementsByClassName("list-items");
      console.log(allEpisodes);
      for (let ep of allEpisodes) {
        if (ep.id === selectElement.value) {
          ep.classList.remove("is-hidden");
        } else if (selectElement.value === "all") {
          ep.classList.remove("is-hidden");
        } else {
          ep.classList.add("is-hidden");
        }
      }
    });
  });
};

// Live Search
searchBar.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const allEpisodes = document.getElementsByClassName("list-items");
  for (let i = 0; i < allEpisodes.length; i++) {
    if (allEpisodes[i].innerText.toLowerCase().includes(searchValue)) {
      allEpisodes[i].classList.remove("is-hidden");
    } else {
      allEpisodes[i].classList.add("is-hidden");
    }
  }
});

//Search Box Style

searchBar.addEventListener("click", () => {
  searchBar.style.borderColor = "transparent";
  searchBar.style.borderRadius = "0";
  searchBar.style.borderBottomStyle = "solid";
  searchBar.style.borderBottomColor = "rgb(104, 104, 104)";
});
