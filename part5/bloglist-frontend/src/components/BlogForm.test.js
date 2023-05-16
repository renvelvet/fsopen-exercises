import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('<BlogForm/> calls createForm function as a props', async () => {
    const createForm = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createForm={createForm} />)

    const inputTitle = screen.getByTestId('title')
    const inputAuthor = screen.getByTestId('author')
    const inputUrl = screen.getByTestId('url')

    await user.type(inputTitle, 'Rekrutmen Bersama 2023')
    await user.type(inputAuthor, 'Resha')
    await user.type(inputUrl, 'https://rekrutmenbersama.fhcibumn.id/')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(createForm.mock.calls).toHaveLength(1)
    expect(createForm.mock.calls[0][0].title).toBe('Rekrutmen Bersama 2023')
    expect(createForm.mock.calls[0][0].author).toBe('Resha')
    expect(createForm.mock.calls[0][0].url).toBe(
      'https://rekrutmenbersama.fhcibumn.id/'
    )
  })
})
