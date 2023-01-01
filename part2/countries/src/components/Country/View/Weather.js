import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';

const Weather = ({ country }) => {
  const [data, setData] = useState([]);

  const url = `${process.env.REACT_APP_API_URL}/weather/?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`;
  useEffect(() => {
    axios.get(url).then((response) => setData(response.data));
  }, [url]);

  return (
    <div>
      <h1>Weather in {data.name}</h1>
      <p>
        {' '}
        temperature {data.main ? (
          (data.main.temp - 273.15).toFixed(2)
        ) : (
          <></>
        )}{' '}
        Celcius{' '}
      </p>
      {data.weather ? <WeatherIcon icon={data.weather[0].icon} /> : <></>}
      <p>wind {data.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
