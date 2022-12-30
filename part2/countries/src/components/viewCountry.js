import { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './weather';

const ViewCountry = ({ country, lat, long }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => setData(response.data));
  }, [country, lat, long]);

  return (
    <div>
      <h1>{country[0].name.common}</h1>
      <p>capital {country[0].capital}</p>
      <p>area {country[0].area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country[0].languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img
          src={country[0].flags.svg}
          alt="flag"
          style={{ width: 300, height: 300 }}
        />
      </div>

      <Weather data={data} country={country} />
    </div>
  );
};

export default ViewCountry;
