import { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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
    setFilter(event.target.value);
  };

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
      setNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        name={name}
        number={number}
        addPhonebook={addPhonebook}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} phonebookToShow={phonebookToShow} />
    </div>
  );
};

export default App;
