import Phonebook from './Phonebook';

const Persons = ({ phonebookToShow, persons }) => {
  return (
    <ul>
      {phonebookToShow.map((person) => (
        <Phonebook key={person.name} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
