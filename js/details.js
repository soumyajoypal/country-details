import getData from "./data.js";
import { createFlagDetails } from "./create.js";
import "./theme.js";

const flagBtn = document.querySelector(".back-home-btn");
const countryDetails = document.querySelector(".country-details");

flagBtn.addEventListener("click", () => {
  console.log("clicked");
  window.location.href = `../home.html`;
});

let urlParams = new URLSearchParams(window.location.search);
let country = urlParams.get("country");
console.log(country);

// border countries events
function addBorderEvents() {
  const borderCountries = document.querySelectorAll(".border-country");
  if (borderCountries.length === 0) {
    return;
  }
  borderCountries.forEach((border) => {
    border.addEventListener("click", () => {
      window.location.href =
        "../details.html?country=" +
        encodeURIComponent(border.dataset.countryName);
    });
  });
}

getData()
  .then((data) => {
    const index = data.findIndex((obj) => {
      return obj.name === country;
    });
    createFlagDetails(index);
    addBorderEvents();
  })
  .catch((error) => {
    console.log(error);
  });
