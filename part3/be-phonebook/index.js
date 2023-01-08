const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

function generateID() {
  const id = Math.random() * 1000000000;
  return id;
}

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return response.status(404).end();
  }

  response.json(person);
});

app.get('/info', (request, response) => {
  const date = new Date().toString();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>`);
});
app.post('/api/persons', (request, response) => {
  const body = request.body;
  const isFound = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (!body.name || !body.number || isFound) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.send(body);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on port ${PORT}`)
);
