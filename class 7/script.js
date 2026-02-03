// =========== Taking input ==========

const inputElem = document.querySelector("#input");
const buttonElem = document.querySelector("#search");

const loadingElem = document.querySelector(".loading");
const errorElem = document.querySelector(".error");
const card = document.querySelector(".weather-container");


// Button Click
buttonElem.addEventListener("click", () => {

  const location = inputElem.value.trim();

  if (location === "") return;


  // Reset
  errorElem.style.display = "none";
  loadingElem.style.display = "block";
  card.classList.remove("fade");


  fetchWeather(location)
    .then((data) => {

      // If invalid city
      if (data.error) {

        showError();
        return;
      }

      updateDOM(data);

      card.classList.add("fade");
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      loadingElem.style.display = "none";
    });


  inputElem.value = "";
});


// Fetch API
async function fetchWeather(location) {

  const url =
    `https://api.weatherapi.com/v1/current.json?key=c7236d36debb4636a18170654262201&q=${location}&aqi=no`;

  const response = await fetch(url);

  const jsonData = await response.json();

  return jsonData;
}


// Show Error
function showError() {

  errorElem.style.display = "block";

  setTimeout(() => {
    errorElem.style.display = "none";
  }, 3000);
}


// Update UI
function updateDOM(data) {

  // Filter Data
  const temperature = data.current.temp_c;
  const location = data.location.name;

  const timedata = data.location.localtime;
  const [date, time] = timedata.split(" ");

  const iconUrl = data.current.condition.icon;

  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });


  // Select Elements
  const tempElem = document.querySelector(".temperature");
  const locationElem = document.querySelector(".location");
  const iconElem = document.querySelector("img");

  const timeElem = document.querySelector(".time");
  const dayElem = document.querySelector(".day");
  const dateElem = document.querySelector(".date");


  // Update DOM
  tempElem.textContent = temperature + " °C";
  locationElem.textContent = location;
  iconElem.src = iconUrl;

  timeElem.textContent = time;
  dayElem.textContent = dayName;
  dateElem.textContent = date;
}