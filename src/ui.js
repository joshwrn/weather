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
const hourlyForecastDiv = document.getElementById('hourly-forecast');
const hourlyCell = document.querySelectorAll('hourly-cell');

//@ CIRCLE
const circle = document.getElementById('circle');

//@ UNITS
let currentUnits = 'imperial';
let currentSymbol = 'F';

//? ANIMATIONS
//+ LOAD
const loadingAnimation = () => {
  root.style.setProperty('--before-filters', 'blur(50px) opacity(80%)');
  root.style.setProperty('--spin-animation', ' spin 1s linear infinite');
};
//+REST
const restAnimation = () => {
  root.style.setProperty('--before-filters', 'blur(50px) opacity(50%)');
  root.style.setProperty('--spin-animation', '');
};
//+ FOCUS
const focusAnimation = () => {
  root.style.setProperty('--before-filters', 'blur(50px) opacity(80%)');
  root.style.setProperty('--spin-animation', 'spin 1.5s linear infinite');
};
//+ TYPING
const typingAnimation = () => {
  root.style.setProperty('--before-transition', 'animation 1s, filter .2s');
  root.style.setProperty('--before-filters', 'blur(65px) opacity(70%)');
};
//+ NOT TYPING
const notTypingAnimation = () => {
  root.style.setProperty('--before-transition', 'animation 1s, filter 1s');
  root.style.setProperty('--before-filters', 'blur(50px) opacity(80%)');
};

//? UI
//@ INITIALIZE
const start = () => {
  getWeather('san francisco', currentUnits);
  changeUnits();
};

//@ SEARCH
const search = () => {
  //+ CLICK BUTTON
  document.addEventListener('click', async (e) => {
    if (e.target.matches('#search-button')) {
      getWeather(searchBoxInput.value, currentUnits);
      searchBoxInput.value = '';
    }
  });
  //+ CLICK ENTER
  searchBoxInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 && searchBoxInput.value !== '') {
      getWeather(searchBoxInput.value, currentUnits);
      searchBoxInput.value = '';
    }
  });
  //+ ON FOCUS
  searchBoxInput.addEventListener('focus', () => {
    focusAnimation();
  });
  //+ ON BLUR
  searchBoxInput.addEventListener('blur', () => {
    restAnimation();
  });
  //+ TYPING
  searchBoxInput.addEventListener('keydown', (e) => {
    if (e.keyCode !== 13) {
      typingAnimation();
    }
  });
  //+ NOT TYPING
  searchBoxInput.addEventListener('keyup', (e) => {
    if (e.keyCode !== 13) {
      notTypingAnimation();
    }
  });
};

//@ SET UNITS
const changeUnits = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.units')) {
      if (currentUnits === 'imperial') {
        currentUnits = 'metric';
        currentSymbol = 'C';
        getWeather(location.innerHTML, currentUnits);
      } else if (currentUnits === 'metric') {
        currentUnits = 'imperial';
        currentSymbol = 'F';
        getWeather(location.innerHTML, currentUnits);
      }
    }
  });
};

//! GET FUNCTIONS
//? GET WEATHER
const getWeather = async (value, units) => {
  loadingAnimation();
  let current = await getCurrent(value, units);
  let forecast = await getForecast(value, units);
  setCurrentTemp(current);
  setHighLow(current);
  setLocation(current);
  setTime(forecast.current.dt);
  hourlyForecastDiv.innerHTML = '';
  createAllCells(forecast);
  restAnimation();
  searchBoxInput.blur();
  setCurrentIcon(current.weather[0].id, forecast.current.dt);
  console.log(current);
  console.log(forecast);
};

//? SET CURRENT
//+ SET ICON
const setCurrentIcon = (id, unix) => {
  let date = new Date(unix * 1000);
  currentIcon.classList = getIcon(id, date.getHours());
};

//+ CURRENT TEMP
const setCurrentTemp = (temp) => {
  let num = Math.round(temp.main.temp);
  currentTemp.innerHTML = `${num}°${currentSymbol}`;
};

//+ MIN MAX TEMPS
const setHighLow = (minMax) => {
  let getHigh = Math.round(minMax.main.temp_max);
  let getLow = Math.round(minMax.main.temp_min);
  currentHigh.innerHTML = `${getHigh}°${currentSymbol}`;
  currentLow.innerHTML = `${getLow}°${currentSymbol}`;
};

//+ SET LOCATION
const setLocation = (value) => {
  let city = value.name.toUpperCase();
  let country = value.sys.country;
  location.innerHTML = `${city}, ${country}`;
};

//+ SET TIME
const setTime = (unix) => {
  time.innerHTML = getTime(unix);
};

//+ GET TIME
const getTime = (unix) => {
  const monthsArr = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const daysArr = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  //UNEDITED DATE
  let date = new Date(unix * 1000);

  //HOURS
  let hours = convertHours(date.getHours());

  //PERIOD
  let period = getPeriod(date.getHours());

  //MINUTES
  let minutes = convertMinutes(date.getMinutes());

  // FULL TIME
  let fullTime = `${hours}:${minutes}${period}`;

  //DAY
  let day = daysArr[date.getDay()];

  //MONTH
  let month = monthsArr[date.getMonth()];

  //@ DATE TOGETHER
  let fullDate = `${fullTime}, ${day}, ${month} ${date.getDate()}`;
  return fullDate;
};

//? CONVERT TIME TO STANDARD
//* CONVERT HOURS
const convertHours = (hours) => {
  if (hours > 0 && hours <= 12) {
    return hours;
  } else if (hours > 12) {
    return hours - 12;
  } else if (hours === 0) {
    return '12';
  }
};

//* GET TIME PERIOD
const getPeriod = (hours) => {
  if (hours == 0 || hours < 12) {
    return 'AM';
  } else if (hours >= 12) {
    return 'PM';
  }
};

//* CONVERT MINUTES
const convertMinutes = (minutes) => {
  if (minutes < 10) {
    return '0' + minutes;
  } else {
    return minutes;
  }
};

//? GET CORRECT ICON
const getIcon = (id, hrs) => {
  if (hrs < 6 || hrs > 18) {
    if (id === 800) {
      return 'fas fa-moon';
    } else if (id >= 801 && id <= 804) {
      return 'fas fa-cloud-moon';
    } else if (id >= 701 && id <= 781) {
      return 'fas fa-wind';
    } else if (id >= 600 && id <= 622) {
      return 'fas fa-snowflake';
    } else if (id >= 500 && id <= 531) {
      return 'fas fa-cloud-moon-rain';
    } else if (id >= 300 && id <= 321) {
      return 'fas fa-cloud-rain';
    } else if (id >= 200 && id <= 232) {
      return 'fas fa-bolt';
    }
  } else if (hrs >= 6 && hrs <= 18)
    if (id === 800) {
      return 'fas fa-sun';
    } else if (id >= 801 && id <= 804) {
      return 'fas fa-cloud-sun';
    } else if (id >= 701 && id <= 781) {
      return 'fas fa-wind';
    } else if (id >= 600 && id <= 622) {
      return 'fas fa-snowflake';
    } else if (id >= 500 && id <= 531) {
      return 'fas fa-cloud-sun-rain';
    } else if (id >= 300 && id <= 321) {
      return 'fas fa-cloud-rain';
    } else if (id >= 200 && id <= 232) {
      return 'fas fa-bolt';
    }
};

//! SET FORECAST
const roundTemp = (temp) => {
  return Math.round(temp);
};

//+ CREATE ALL CELLS
const createAllCells = (input) => {
  for (let i = 1; i <= 25; i++) {
    createCells(
      input.hourly[i].dt,
      input.hourly[i].temp,
      input.hourly[i].weather[0].id
    );
  }
};

//+ CREATE CELL
const createCells = (unix, hrTemp, desc) => {
  let date = new Date(unix * 1000);

  //HOURS
  let hours = convertHours(date.getHours());

  // PERIOD
  let period = getPeriod(date.getHours());

  // TIME
  let fullTime = `${hours}${period}`;

  //TEMP
  let cellTemp = `${roundTemp(hrTemp)}°${currentSymbol}`;

  //+ CREATE ELEMENTS
  //@ CELL
  const newCell = document.createElement('div');
  newCell.className = 'hourly-cell';

  //@ HR TIME
  const newTime = document.createElement('p');
  newTime.classList = 'hr-time';
  newTime.innerHTML = fullTime;

  //@ HR ICON
  const newIcon = document.createElement('i');
  newIcon.classList = `${getIcon(desc, date.getHours())}`;

  //@HR TEMP
  const newTemp = document.createElement('p');
  newTemp.classList = 'hr-temp';
  newTemp.innerHTML = cellTemp;

  //+ APPEND ELEMENTS
  newCell.appendChild(newTime);
  newCell.appendChild(newIcon);
  newCell.appendChild(newTemp);

  hourlyForecastDiv.appendChild(newCell);
};

export { start, search, changeUnits };
