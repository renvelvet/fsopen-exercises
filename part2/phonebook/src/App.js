import { useState, useEffect } from 'react';
import { getAll, add, replaceNumber, deletePerson } from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getAll().then((data) => {
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

    const target = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    const message =
      'is already added to phonebook, replace the old number with a new one?';
    if (
      persons.filter(
        (person) => person.name.toLowerCase() === name.toLowerCase()
      ).length !== 0
    ) {
      if (window.confirm(`${target.name} ${message} `)) {
        replaceNumber(target.id, { ...target, number: newPerson.number }).then(
          (newNumber) =>
            setPersons(
              persons.map((person) =>
                person.id !== target.id ? person : newNumber
              )
            )
        );
      }
    } else {
      add(newPerson).then((newData) => {
        setPersons(persons.concat(newData));
        setName('');
        setNumber('');
      });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const id = parseInt(event.target.value);
    const target = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${target.name} ?`)) {
      deletePerson(target.id);
      setPersons(persons.filter((person) => person.id !== target.id));
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
      <Persons
        persons={persons}
        phonebookToShow={phonebookToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
