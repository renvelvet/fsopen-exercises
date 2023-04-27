const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }

  return null;
};

blogsRouter.post('/', async (request, response, next) => {
  const user = await User.find({});
  const { title, author, url, likes } = request.body;
  const blog = new Blog({ title, url, author, likes, user: user[0].id });

  /* 
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);
 */
  try {
    const savedBlog = await blog.save();
    user[0].blogs = user[0].blogs.concat(savedBlog._id);
    await user[0].save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.patch('/:id', async (request, response) => {
  const updatedInformation = request.body;
  await Blog.findByIdAndUpdate(request.params.id, updatedInformation, {
    new: true,
  })
    .then((blog) => {
      if (!blog) {
        return response.status(400).send();
      }
      response.send(blog);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

module.exports = blogsRouter;
