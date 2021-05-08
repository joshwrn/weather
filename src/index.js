const getWeather = async (value = 'los angeles') => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=imperial&appid=9fd048a0fc1fbe1def9f57a580609f63`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();
  console.log(weatherData);
};

getWeather();
