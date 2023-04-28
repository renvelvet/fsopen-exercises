const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const {
  blogsInDb,
  initialBlogs,
  initialUsers,
  usersInDb,
  nonExistingId,
} = require('./test_helper');

let authHeader;

describe('blogs api', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    // create a test user and save the corresponding auth header
    const user = initialUsers[0];
    await api.post('/api/users').send(user);
    const response = await api.post('/api/login').send(user);
    authHeader = `Bearer ${response.body.token}`;
  });

  describe('when save blogs applied', () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await Blog.insertMany(initialBlogs);
    });

    test('list are returned as json', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('blogs has field id', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blog = response.body[0];

      expect(blog.id).toBeDefined();
    });

    test('a blog can be edited', async () => {
      const [blogBefore] = await blogsInDb();

      const modifiedBlog = { ...blogBefore, title: 'Goto considered useful' };

      await api
        .put(`/api/blogs/${blogBefore.id}`)
        .send(modifiedBlog)
        .expect(200);

      const blogs = await blogsInDb();

      const titles = blogs.map((r) => r.title);

      expect(titles).toContain(modifiedBlog.title);
    });

    describe('a new blog', () => {
      test('can be added', async () => {
        const blog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
        };

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogs = await blogsInDb();

        expect(blogs).toHaveLength(initialBlogs.length + 1);

        const titles = blogs.map((r) => r.title);

        expect(titles).toContain(blog.title);
      });

      test('has likes initialized to 0 if initial value is not given', async () => {
        const blog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        };

        const response = await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        expect(response.body.likes).toBe(0);
      });

      test('verify that if the title properties are missing from the request data, status code 400 Bad Request', async () => {
        const newBlog = {
          author: 'Nur Fauziyyaaa',
          url: 'https://medium.com/generation-girl/discover-myths-to-improve-your-english-communication-91a72a07f9b6',
          likes: 1,
        };

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/);
      });

      test('verify that if the url properties are missing from the request data, status code 400 Bad Request', async () => {
        const newBlog = {
          title: 'test',
          author: 'Nur Fauziyyaaa',
          likes: 1,
        };

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(newBlog)
          .expect(400)
          .expect('Content-Type', /application\/json/);
      });
    });
  });

  describe('a blog', () => {
    let id;
    beforeEach(async () => {
      await Blog.deleteMany({});

      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', authHeader)
        .send(blog);

      id = response.body.id;
    });

    test('can be deleted by the creator', async () => {
      const blogsBefore = await blogsInDb();

      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', authHeader)
        .expect(204);

      const blogsAfter = await blogsInDb();

      expect(blogsAfter).toHaveLength(0);
    });

    test('can not be deleted without valid auth header', async () => {
      const blogsBefore = await blogsInDb();

      await api.delete(`/api/blogs/${id}`).expect(401);

      const blogsAfter = await blogsInDb();

      expect(blogsAfter).toHaveLength(1);
    });
  });

  describe('creation of a user', () => {
    test('succeeds with valid username and password', async () => {
      const user = {
        username: 'renvelvet',
        password: 'sekret',
      };

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const users = await usersInDb();

      expect(users).toHaveLength(initialUsers.length + 1);
      const usernames = users.map((u) => u.username);
      expect(usernames).toContain(user.username);
    });

    test('fails with a proper error if username is too short', async () => {
      const user = {
        username: 're',
        password: 'sekret',
      };

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain(
        'Username must be at least 3 characters long'
      );
    });

    test('fails with a proper error if password is too short', async () => {
      const user = {
        username: 'renvelvet_',
        password: 'se',
      };

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain(
        'Password must be at least 3 characters long'
      );
    });

    test('fails with a proper error if username not unique', async () => {
      const user = initialUsers[0];

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain(
        'expected `username` to be unique.'
      );
    });
  });
});

describe('verifying post information', () => {
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

    const user = await api
      .post('/api/login')
      .send({ username: 'renvelvet', password: '1234password' });

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authHeader)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.likes).toBe(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
