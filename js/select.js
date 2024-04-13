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

  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      document.getElementById("selected-option").innerText = this.innerText;
      selectOptions.style.display = "none";
    });
  });
});
