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

afterAll(async () => {
  await mongoose.connection.close();
});
