const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;
  const blog = new Blog({ title, url, author, likes, user: user._id });

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

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blog.id);
    response.status(204).end();
  }
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
