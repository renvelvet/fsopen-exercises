const listHelper = require('../utils/list_helper').dummy;

test('dummy returns one', () => {
  const blog = [];

  const result = listHelper(blog);
  expect(result).toBe(1);
});
