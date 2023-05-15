import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

//eslint-disbale-next-line quotes
test('renders blog\'s title and author', () => {
  const blog = {
    title: 'How to Replace an Element in an Array in JavaScript',
    author: 'Borislav Hadzhiev',
    url: 'https://bobbyhadz.com/blog/javascript-replace-element-in-array',
    likes: 3,
  }

  const { container } = render(<Blog blog={blog} />)

  const divBlog = container.querySelector('.blog')
  expect(divBlog).toHaveTextContent(
    'How to Replace an Element in an Array in JavaScript',
    { exact: false }
  )
  expect(divBlog).toHaveTextContent('Borislav Hadzhiev', { exact: false })

  const divLikes = container.querySelector('.likes')
  expect(divLikes).toBeNull()

  const divUrl = container.querySelector('.url')
  expect(divUrl).toBeNull()
})
