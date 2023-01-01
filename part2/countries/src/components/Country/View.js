import Weather from './View/Weather';
import Info from './View/Info';

const View = ({ country }) => {
  return (
    <div>
      <Info country={country} />
      <Weather country={country} />
    </div>
  );
};

export default View;
