import { useState } from 'react';
import View from './View';

const Item = ({ country }) => {
  console.log('Item', country);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
    console.log(country);
  };

  return (
    <div>
      {country.name.common}{' '}
      <button onClick={handleClick}>{show ? 'hide' : 'show'}</button>
      <div>{show ? <View country={country} /> : <div></div>}</div>
    </div>
  );
};
export default Item;
