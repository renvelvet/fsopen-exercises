const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Grow Yourself using Life Path Map',
    author: 'Siti Annisa R.',
    url: 'https://medium.com/generation-girl/grow-yourself-using-life-path-map-26390523a67f',
    likes: 2,
  },
  {
    title: 'Making Your First GitHub Page(s)',
    author: 'Vania Radmila Alfitri',
    url: 'https://medium.com/generation-girl/making-your-first-github-page-s-8e8fb4e5c55e',
    likes: 3,
  },
];

const initialUsers = [
  {
    username: 'tester',
    password: 'sekret',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'willremovethissoon',
    url: 'willremovethissoon',
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
