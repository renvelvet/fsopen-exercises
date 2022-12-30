import Phonebook from './Phonebook';

const Persons = ({ phonebookToShow }) => {
  return (
    <ul>
      {phonebookToShow.map((person) => (
        <Phonebook key={person.name} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
