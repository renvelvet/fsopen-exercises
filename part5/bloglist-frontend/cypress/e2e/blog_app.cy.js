describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Resha',
      username: 'reshapuspita',
      password: 'password1234',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
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
      cy.get('.blog').should('have.length', 0)

      cy.get('[data-testid=title]').type('a new blog')
      cy.get('[data-testid=author]').type('Resha')
      cy.get('[data-testid=url]').type('http://localhost:3000/')
      cy.get('#create-button').click()

      cy.contains('a new blog by Resha')
      cy.get('.blog').should('have.length', 1)
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Like',
          author: 'Raisha',
          url: 'raisha.com',
        })
      })

      it('users can like a blog', function () {
        cy.get('.blog').first().find('button').click()

        cy.get('.likes').contains('likes 0')
        cy.get('.likes').find('button').click()
        cy.get('.likes').contains('likes 1')
      })

      it('users can remove owned blog', function () {
        cy.get('.blog').first().find('button').click()

        cy.get('.removeBtn').click()
      })

      it('can see the delete button', function () {
        cy.get('.blog').first().find('button').click()
        cy.contains('remove')
      })

      it.only('ordered according to likes', function () {
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'me',
          url: 'me.com',
        })

        cy.get('.blogContainer button').eq(0).click()
        cy.get('.blogContainer .likes').eq(0).find('.likeBtn').click()
        cy.get('.blogContainer .likes').eq(0).contains('likes 1')
        cy.get('.blogContainer .likes').eq(0).find('.likeBtn').click()
        cy.get('.blogContainer .likes').eq(0).contains('likes 2')
        cy.get('.blogContainer .likes').eq(0).find('.likeBtn').click()
        cy.get('.blogContainer .likes').eq(0).contains('likes 3')

        cy.get('.blogContainer').eq(0).should('contain', 'Test Like by Raisha')
        cy.get('.blogContainer')
          .eq(1)
          .should('contain', 'The title with the second most likes')
      })
    })
  })
})
