import { getForecast, getCurrent } from './weather';

//@ ROOT
const root = document.documentElement;

//@ SEARCH BOX
const searchBoxInput = document.getElementById('input');
const searchBoxButton = document.getElementById('search-button');

//@ CURRENT DETAILS
const currentIcon = document.getElementById('current-icon');
const currentTemp = document.getElementById('current-temp');
const currentHigh = document.getElementById('current-high');
const currentLow = document.getElementById('current-low');

//@ TIME & LOCATION
const time = document.getElementById('time');
const location = document.getElementById('location');

//@ HOURLY FORECAST
const hourlyCell = document.querySelectorAll('hourly-cell');

//@ CIRCLE
const circle = document.getElementById('circle');

//? ANIMATIONS
//+ LOAD
const loadingAnimation = () => {
  root.style.setProperty(
    '--spin-animation',
    'gradient 15s ease infinite, spin 1s linear infinite'
  );
  root.style.setProperty('--before-filters', 'blur(50px) opacity(80%)');
};
//+REST
const restAnimation = () => {
  root.style.setProperty('--before-filters', 'blur(50px) opacity(50%)');
  root.style.setProperty('--spin-animation', 'gradient 15s ease infinite');
};

//? UI
//+INITIALIZE
const ui = async () => {
  getWeather();
};

//+ SEARCH BUTTON
const search = () =>
  document.addEventListener('click', async (e) => {
    if (e.target.matches('#search-button')) {
      getWeather(searchBoxInput.value);
    }
  });

//? GET FUNCTIONS
const getWeather = async (value) => {
  loadingAnimation();
  let current = await getCurrent(value);
  let forecast = await getForecast(value);
  setCurrentTemp(current);
  setHighLow(current);
  setLocation(current);
  restAnimation();
  console.log(forecast);
};

//? SET FUNCTIONS
//+ CURRENT TEMP
const setCurrentTemp = (temp) => {
  let num = Math.round(temp.main.temp);
  currentTemp.innerHTML = `${num}°F`;
};

//+ MIN MAX TEMPS
const setHighLow = (minMax) => {
  let getHigh = Math.round(minMax.main.temp_max);
  let getLow = Math.round(minMax.main.temp_min);
  currentHigh.innerHTML = `${getHigh}°F`;
  currentLow.innerHTML = `${getLow}°F`;
};

//+ SET LOCATION
const setLocation = (value) => {
  let city = value.name.toUpperCase();
  let country = value.sys.country;
  location.innerHTML = `${city}, ${country}`;
};

export { ui, search };
