let _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes,
        0
      );
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);

  const max = Math.max(...likes);

  const indexOfFavoriteBlog = likes.indexOf(max);

  return {
    author: blogs[indexOfFavoriteBlog].author,
    likes: blogs[indexOfFavoriteBlog].likes,
    title: blogs[indexOfFavoriteBlog].title,
  };
};

const mostBlogs = (blogs) => {
  const blogGroupByAuthor = _.countBy(blogs, 'author');

  const authorWithMostBlog = _.max(
    Object.keys(blogGroupByAuthor),
    (author) => blogGroupByAuthor[author]
  );

  return {
    author: authorWithMostBlog,
    blogs: blogGroupByAuthor[authorWithMostBlog],
  };
};

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const totalBlogsByAuthor = _.mapValues(blogsByAuthor, (item) =>
    _.sumBy(item, 'likes')
  );
  const maxLikes = _.max(Object.values(totalBlogsByAuthor));
  const indexMostLikesAuthor = _.indexOf(
    Object.values(totalBlogsByAuthor),
    maxLikes
  );

  return {
    author: Object.keys(totalBlogsByAuthor)[indexMostLikesAuthor],
    likes: Object.values(totalBlogsByAuthor)[indexMostLikesAuthor],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
