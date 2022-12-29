import { useState } from 'react';
import Phonebook from './components/Phonebook';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
    },
  ]);
  const [name, setName] = useState('');

  const handleOnChange = (event) => {
    setName(event.target.value);
  };

  const addPhonebook = (event) => {
    event.preventDefault();
    const newName = {
      name: name,
    };
    setPersons(persons.concat(newName));
    setName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhonebook}>
        <div>
          name: <input value={name} onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Phonebook key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
