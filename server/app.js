const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./config/database.js');
// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to MongoDB
connectDB()

const server = new  ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ mongoDataMethods })
})

const app = express()
app.use(cors())


server.start().then(res => {
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT || 5021 }, () =>
console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)  );  
});