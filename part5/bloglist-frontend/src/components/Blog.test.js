import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'How to Replace an Element in an Array in JavaScript',
    author: 'Borislav Hadzhiev',
    url: 'https://bobbyhadz.com/blog/javascript-replace-element-in-array',
    likes: 3,
  }

  const mockLikeHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLike={mockLikeHandler} />
    ).container
  })

  test('renders blog title and author only in the first time', () => {
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

  test('renders blog number of likes and url after "view" button clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getAllByText('view')
    await user.click(button[1])

    container.querySelectorAll('div[likes]').forEach((eachDiv) => {
      expect(eachDiv).toHaveTextContent(3, { exact: false })
    })
    container.querySelectorAll('div[url]').forEach((eachDiv) => {
      expect(eachDiv).toHaveTextContent(
        'https://bobbyhadz.com/blog/javascript-replace-element-in-array',
        { exact: false }
      )
    })
  })

  test('should call the like event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getAllByText('view')
    await user.click(button[1])

    container.querySelectorAll('div[likes]').forEach((eachDiv) => {
      user.click(eachDiv)
      expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
  })
})
