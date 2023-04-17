const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('list are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('verifies that the unique identifier property of the blog posts is named id', async () => {
  const res = await api.get('/api/blogs');

  res.body.forEach((element) => expect(element.id).toBeDefined());
});

test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'Discover Myths to Improve Your English Communication',
    author: 'Nur Fauziyyaaa',
    url: 'https://medium.com/generation-girl/discover-myths-to-improve-your-english-communication-91a72a07f9b6',
  };

  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);

  expect(res.body.likes).toBe(0);
});

test('verify that if the title properties are missing from the request data, status code 400 Bad Request', async () => {
  const newBlog = {
    author: 'Nur Fauziyyaaa',
    url: 'https://medium.com/generation-girl/discover-myths-to-improve-your-english-communication-91a72a07f9b6',
    likes: 1,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('verify that if the url properties are missing from the request data, status code 400 Bad Request', async () => {
  const newBlog = {
    title: 'test',
    author: 'Nur Fauziyyaaa',
    likes: 1,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
