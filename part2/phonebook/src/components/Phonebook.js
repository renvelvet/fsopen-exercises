const Phonebook = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}{' '}
      <button value={person.id} onClick={handleDelete}>
        delete
      </button>{' '}
    </li>
  );
};
export default Phonebook;
