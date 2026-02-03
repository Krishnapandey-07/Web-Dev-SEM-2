const inputElem = document.querySelector("#input");
const buttonElem = document.querySelector("#search");
const loadingElem = document.querySelector(".loading");
const errorElem = document.querySelector(".error");
const card = document.querySelector(".weather-container");
const animationLayer = document.querySelector(".animation");

buttonElem.addEventListener("click", () => {

  const location = inputElem.value.trim();
  if (!location) return;

  loadingElem.style.display = "block";
  errorElem.style.display = "none";

  fetchWeather(location)
    .then(data => {
      if (data.error) return showError();
      updateDOM(data);
    })
    .catch(showError)
    .finally(() => loadingElem.style.display = "none");

  inputElem.value = "";
});

async function fetchWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=c7236d36debb4636a18170654262201&q=${location}&aqi=no`;
  const res = await fetch(url);
  return await res.json();
}

function showError() {
  errorElem.style.display = "block";
  setTimeout(() => errorElem.style.display = "none", 3000);
}

function updateDOM(data) {

  document.querySelector(".temperature").textContent = data.current.temp_c + " °C";
  document.querySelector(".location").textContent = data.location.name;

  const [date, time] = data.location.localtime.split(" ");

  document.querySelector(".time").textContent = time;
  document.querySelector(".date").textContent = date;
  document.querySelector(".day").textContent =
    new Date(date).toLocaleDateString("en-US",{weekday:"long"});

  document.querySelector("img").src = data.current.condition.icon;

  applyAnimation(data.current.condition.text.toLowerCase());
}

function applyAnimation(condition) {

  animationLayer.innerHTML = "";
  animationLayer.className = "animation";
  document.body.className = "";

  if (condition.includes("rain")) {
    animationLayer.classList.add("rain");
    createParticles(120);
  }
  else if (condition.includes("snow")) {
    animationLayer.classList.add("snow");
    createParticles(80);
  }
  else if (condition.includes("cloud")) {
    document.body.classList.add("clouds");
  }
  else {
    document.body.classList.add("sunny");
  }
}

function createParticles(count) {
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 0.5 + Math.random() + "s";
    span.style.animationDelay = Math.random() + "s";
    animationLayer.appendChild(span);
  }
}
