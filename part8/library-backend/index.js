const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let authors = [
  {
    name: 'Tere Liye',
    born: 1979,
    bookCount: 51,
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: "Dewi 'Dee' Lestari",
    born: 1976,
    bookCount: 17,
    id: '3d594650-3436-11e9-bc57-8b80ba54c432',
  },
  {
    name: 'Henry Manampiring',
    born: 1983,
    bookCount: 17,
    id: '3d594650-3436-11e9-bc57-8b80ba54c433',
  },
]

const typeDefs = `
  type Author {
    name: String!
    born: String
    bookCount: Int
    id: ID!
  }

  type Query {
    allAuthors: [Author!]!
  }

`

const resolvers = {
  Query: {
    allAuthors: () => authors,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
