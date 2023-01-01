const Info = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img
          src={country.flags.svg}
          alt="flag"
          style={{ width: 300, height: 300 }}
        />
      </div>
    </div>
  );
};

export default Info;
