describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Resha',
      username: 'reshapuspita',
      password: 'password1234',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('reshapuspita')
      cy.get('#password').type('password1234')
      cy.get('#login-button').click()

      cy.contains('Resha logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('reshapuspita')
      cy.get('#password').type('password12')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Resha logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'reshapuspita', password: 'password1234' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('[data-testid=title]').type('a new blog')
      cy.get('[data-testid=author]').type('Resha')
      cy.get('[data-testid=url]').type('http://localhost:3000/')
      cy.get('#create-button').click()

      cy.contains('a new blog by Resha')
    })
  })
})
