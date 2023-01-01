import Phonebook from './Phonebook';

const Persons = ({ phonebookToShow, handleDelete }) => {
  return (
    <ul>
      {phonebookToShow.map((person) => (
        <Phonebook
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default Persons;
