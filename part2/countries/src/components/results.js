import ViewCountry from './viewCountry';
import ListCountries from './listCountries';
import Prompt from './prompt';

const Results = ({ resultCountries, filter }) => {
  if (resultCountries.length > 10 && filter.length !== 0) {
    return <Prompt />;
  } else if (resultCountries.length <= 10 && resultCountries.length > 1) {
    return <ListCountries listCountries={resultCountries} />;
  } else if (resultCountries.length === 1)
    return (
      <ViewCountry
        country={resultCountries}
        lat={resultCountries[0].latlng[0]}
        long={resultCountries[0].latlng[1]}
      />
    );
};

export default Results;
