const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((exception) => next(exception));
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
