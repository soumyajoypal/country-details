import getData from "./data.js";
let dataArray = [];
getData()
  .then((data) => {
    dataArray = data;
  })
  .catch((error) => {
    console.log(error);
  });

const displayArea = document.querySelector(".display-area");
const countryDetails = document.querySelector(".country-details");

export function createFlagBox(data) {
  return `
    <div class="flag-box">
    <div class="flag-image-mobile">
      <img src="${data.flags.svg}" alt="" lazyloading >
      </div>
       <div class="flag-image-desktop">
      <img src="${data.flags.png}" alt="" lazyloading >
      </div>
       <div class="flag-box__details">
        <h2>${data.name}</h2>
        <ul>
          <li><span class="bold">Population: </span>${data.population}</li>
          <li><span class="bold">Region: </span>${data.region}</li>
          <li><span class="bold">Capital: </span>${data.capital}</li>
        </ul>
      </div>
    </div>
  `;
}

export function createFlagBoxes(Array) {
  const displayArea = document.querySelector(".display-area");

  const displayAreaHTML = Array.map((data) => createFlagBox(data)).join("");

  displayArea.innerHTML = displayAreaHTML;
}
export function createFlagDetails(index = 0) {
  const {
    name,
    nativeName,
    population,
    capital,
    topLevelDomain,
    region,
    subregion,
    currencies,
    languages,
    borders,
    flags,
  } = dataArray[index];

  const languagesList = languages.map((lang) => lang.name).join(", ");

  const currenciesList = currencies.map((curr) => curr.name).join(", ");
  const borderCountriesList = borders
    ? borders
        .slice(0, 3) // Limit to the first three elements
        .map((country) => {
          const foundCountry = dataArray.find(
            (obj) => obj.alpha3Code === country
          );
          return foundCountry
            ? `<li class="border-country" data-country-name="${
                foundCountry.name
              }">${foundCountry.name.split("(")[0]}</li>`
            : "";
        })
        .join("")
    : "";

  const flagDetailsHTML = `
    <div class="country-flag">
      <img src="${flags.png}" alt="">
    </div>
    <div class="country-box">
    <h1 class="country-name">${name}</h1>
    <div class="country-info">
      <div class="col-1">
        <ul>
          <li><span>Native Name: </span>${nativeName}</li>
          <li><span>Population: </span>${population}</li>
          <li><span>Region: </span>${region}</li>
          <li><span>Sub Region: </span>${subregion}</li>
          <li><span>Capital: </span>${capital}</li>
        </ul>
      </div>
      <div class="col-2">
        <ul>
          <li><span>Top Level Domain: </span>${topLevelDomain}</li>
          <li><span>Currencies: </span>${currenciesList}</li>
          <li><span>Languages: </span>${languagesList}</li>
        </ul>
      </div>
    </div>
    ${
      borders
        ? `<div class="border-countries">
      <h2>Border Countries:</h2>
      <ul>${borderCountriesList}</ul>
    </div>`
        : ""
    }
    </div>
  `;

  countryDetails.innerHTML = flagDetailsHTML;
}
