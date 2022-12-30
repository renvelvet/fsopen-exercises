const Weather = ({data, country}) => {
    console.log(data);
  return (
    <div>
      <h1>Weather in {country[0].name.common}</h1>
      {/* <p>temperature {data.main.temp} Celcius </p> */}
    </div>
  );
};

export default Weather;
