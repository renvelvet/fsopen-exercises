const WeatherIcon = ({ icon }) => {
  const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div>
      <img src={url} alt="weather icon" />
    </div>
  );
};

export default WeatherIcon;
