import { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './components/results';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setNewCountry(event.target.value);
  };

  const resultCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newCountry.toLowerCase())
  );

  console.log(resultCountries.length);
  return (
    <div>
      <div>
        find countries <input value={newCountry} onChange={handleChange} />
      </div>
      <Results resultCountries={resultCountries} filter={newCountry} />
    </div>
  );
};

export default App;
