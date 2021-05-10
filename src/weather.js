const getForecast = async (location = 'san francisco', units = 'imperial') => {
  const response = await fetch(requestLocation(location, units), {
    mode: 'cors',
  });
  const weatherData = await response.json();
  const getFullWeather = await fetch(
    requestFullWeather(weatherData.coord, units),
    {
      mode: 'cors',
    }
  );
  const fullWeather = await getFullWeather.json();
  return fullWeather;
};

const getCurrent = async (location = 'san francisco', units = 'imperial') => {
  const response = await fetch(requestLocation(location, units), {
    mode: 'cors',
  });
  const weatherData = await response.json();
  return weatherData;
};

const requestLocation = (location, units) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=9fd048a0fc1fbe1def9f57a580609f63`;
};

const requestFullWeather = (coords, units) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=70d3ce744008d557a872cee31d8820ce`;
};

export { getForecast, getCurrent };
