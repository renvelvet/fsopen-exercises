import Item from './Item';

const List = ({ result }) => {
  return (
    <div>
      {result.map((country) => (
        <Item key={country.tld} country={country} />
      ))}
    </div>
  );
};

export default List;
