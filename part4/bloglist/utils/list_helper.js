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

module.exports = { dummy, totalLikes, favoriteBlog };
