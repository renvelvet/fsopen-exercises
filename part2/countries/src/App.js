import { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './components/Result';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const result = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Filter filter={filter} handleChange={handleChange} />
      {filter.length !== 0 ? <Result result={result} /> : <></>}
    </>
  );
};

export default App;
