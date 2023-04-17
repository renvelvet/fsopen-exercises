const Blog = require('../models/blog');

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  console.log('blogs', blogs)
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
