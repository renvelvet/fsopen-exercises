import ViewCountry from './viewCountry';

const ListCountries = ({ listCountries }) => {
  const handleClick = (event) => <ViewCountry country={event.target.value} />;

  return (
    <ul>
      {listCountries.map((country) => (
        <li key={country.tld[0]}>
          {country.name.common}{' '}
          <button type='button' value={country} onClick={handleClick}>
            show
          </button>{' '}
        </li>
      ))}
    </ul>
  );
};

export default ListCountries;
