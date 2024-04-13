import getData from "./data.js";
import { createFlagBoxes, createFlagBox } from "./create.js";
import "./theme.js";

let countryDataArray = [];
const displayArea = document.querySelector(".display-area");
const search = document.getElementById("search");
const options = document.querySelectorAll(".option");
const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".search-box ul");

async function fetchData() {
  try {
    displayArea.innerHTML = `<h2 class="loading-text">Loading Countries...</h2>`;
    const data = await getData();
    countryDataArray = data;
    displayArea.innerHTML = "";
    main();
  } catch (error) {
    console.error(error);
  }
}

function addEvents(array) {
  document.querySelectorAll(".flag-box").forEach((box, index) => {
    box.addEventListener("click", () => {
      const country = array[index].name;
      window.location.href = `../details.html?country=${encodeURIComponent(
        country
      )}`;
    });
  });
}

function findSelectOption(region) {
  document.getElementById("selected-option").innerText = region;
}

function removeLocalStorageItems() {
  localStorage.removeItem("listArray");
  localStorage.removeItem("selectedOption");
}

function regionFilter(selectedRegion) {
  let filteredArray;
  if (selectedRegion === "All") {
    filteredArray = countryDataArray;
    removeLocalStorageItems();
  } else {
    filteredArray = countryDataArray.filter(
      (obj) => obj.region === selectedRegion
    );
  }
  localStorage.setItem("listArray", JSON.stringify(filteredArray));
  main();
}

function countryDisplay(country) {
  displayArea.innerHTML = createFlagBox(country);
  findSelectOption(country.region);
  removeLocalStorageItems();
  document.querySelector(".flag-box").addEventListener("click", () => {
    window.location.href = `../details.html?country=${encodeURIComponent(
      country.name
    )}`;
  });
}

function searchCountry() {
  const inputValue = search.value.trim();
  if (!inputValue) {
    searchBox.innerHTML = ``;
    return;
  }
  search.value = ``;
  const country = countryDataArray.find(
    (obj) => obj.name.toLowerCase() === inputValue.toLowerCase()
  );
  country
    ? countryDisplay(country)
    : (displayArea.innerHTML = `<h1 class="loading-text">Country Not Found</h1>`);
}

function showRecommendations(value) {
  searchBox.innerHTML = "";

  let count = 0;
  countryDataArray.forEach((obj) => {
    if (count >= 5) return;
    if (obj.name.toLowerCase().includes(value.toLowerCase())) {
      const listItem = document.createElement("li");
      listItem.classList.add("recommended-item");
      listItem.textContent = obj.name;
      searchBox.appendChild(listItem);
      count++;
    }
  });
  const listItems = document.querySelectorAll(".recommended-item");
  if (listItems.length > 0) {
    listItems.forEach((item) => {
      item.addEventListener("click", () => {
        search.value = item.innerText;
        searchBox.innerHTML = ``;
      });
    });
  } else {
    searchBox.innerHTML = `<li class="recommended-item">Not Found</li>`;
    document
      .querySelector(".recommended-item")
      .addEventListener("click", () => {
        search.value = ``;
        searchBox.innerHTML = ``;
      });
  }
}

function main() {
  const region = JSON.parse(localStorage.getItem("selectedOption"));
  region && findSelectOption(region);
  const array =
    JSON.parse(localStorage.getItem("listArray")) || countryDataArray;
  createFlagBoxes(array);
  addEvents(array);
}

document.addEventListener("DOMContentLoaded", function () {
  const selectHeader = document.getElementById("select-header");
  const selectOptions = document.getElementById("select-options");

  selectHeader.addEventListener("click", function () {
    selectOptions.style.display =
      selectOptions.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function (event) {
    if (!selectHeader.contains(event.target)) {
      selectOptions.style.display = "none";
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedRegion = this.innerText;
      selectOptions.style.display = "none";
      regionFilter(selectedRegion);
      localStorage.setItem("selectedOption", JSON.stringify(selectedRegion));
      document.getElementById("selected-option").innerText = selectedRegion;
    });
  });

  searchIcon.addEventListener("click", searchCountry);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchCountry();
    }
  });
  search.addEventListener("input", (event) => {
    const value = event.target.value;
    if (value == "") {
      searchBox.innerHTML = ``;
      return;
    }
    showRecommendations(value);
  });
});

fetchData();
