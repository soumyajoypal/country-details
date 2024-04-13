const modeLogo = document.querySelector(".theme-icon");
let isDarkMode = localStorage.getItem("isDarkMode") === "true";
const body = document.body;
modeLogo.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    setDarkMode();
  } else {
    setLightMode();
  }
  localStorage.setItem("isDarkMode", isDarkMode);
});
if (isDarkMode) {
  setDarkMode();
} else {
  setLightMode();
}
function setDarkMode() {
  modeLogo.innerHTML = `
    <i class="fas fa-sun"></i>
            <span>Light Mode</span>
    `;
  body.style.setProperty("--bg-color", "var(--very-dark-blue)");
  body.style.setProperty("--header-bg-color", "var(--dark-blue)");
  body.style.setProperty("--header-color", "var(--white)");
  body.style.setProperty("--element-color", "var(--dark-blue)");
  body.style.setProperty("--element-text-color", "var(--white)");
  body.style.setProperty("--flag-box-text", "var(--white)");
}

function setLightMode() {
  modeLogo.innerHTML = `
    <i class="fas fa-moon"></i>
            <span>Dark Mode</span>
    `;
  body.style.setProperty("--bg-color", "var(--very-light-gray)");
  body.style.setProperty("--header-bg-color", "var(--white)");
  body.style.setProperty("--header-color", "var(--very-dark-blue-light)");
  body.style.setProperty("--element-color", "var(--white)");
  body.style.setProperty("--element-text-color", "var(--dark-gray)");
  body.style.setProperty("--flag-box-text", " var(--very-dark-blue-light)");
}
