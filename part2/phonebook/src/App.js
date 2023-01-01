import { useState, useEffect } from 'react';
import { getAll, add } from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getAll().then((data) => {
      console.log(data);
      setPersons(data);
    });
  }, []);

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
    const newPerson = {
      name: name,
      number: number,
    };

    if (persons.filter((person) => person.name === name).length !== 0) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      add(newPerson).then((newData) => {
        setPersons(persons.concat(newData));
        setName('');
        setNumber('');
      });
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
