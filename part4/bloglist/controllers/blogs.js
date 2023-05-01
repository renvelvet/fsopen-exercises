const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;
  const blog = new Blog({ title, url, author, likes });

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' });
  }
  blog.user = user.id;

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (!user || user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'operation not permitted' });
  }

  user.blogs = user.blogs.filter(
    (blog) => blog.toString() != blog.id.toString()
  );

  await user.save();
  await blog.remove();

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, url, author, likes } = request.body;

  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, url, author, likes, user: user.id },
    { new: true }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;
