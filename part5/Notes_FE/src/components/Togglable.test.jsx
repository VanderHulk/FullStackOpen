import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>togglable content</div>
      </Togglable>
    )

    screen.debug()
  })

  test('renders its children', () => {
    const element = screen.getByText('togglable content')   
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('togglable content')    
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('togglable content')
    screen.debug()
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)
    screen.debug()

    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)

    const element = screen.getByText('togglable content')
    screen.debug()
    expect(element).not.toBeVisible()
  })
})