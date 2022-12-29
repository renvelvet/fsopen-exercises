import { useState } from 'react';
import Phonebook from './components/Phonebook';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
    },
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const phonebookToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const addPhonebook = (event) => {
    event.preventDefault();
    const newName = {
      name: name,
      number: number,
    };

    if (persons.filter((person) => person.name === name).length !== 0) {
      alert(`${newName.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newName));
      setName('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPhonebook}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number <input onChange={handleNumberChange} />{' '}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {phonebookToShow.map((person) => (
          <Phonebook key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
