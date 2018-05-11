const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const fetch = require('node-fetch')
const schema = require('./schema')
const DataLoader = require('dataloader')
const util = require('util')
const parseXML = util.promisify(require('xml2js').parseString)

const fetchAuthor = id =>
fetch(`https://www.goodreads.com/author/show.xml?id=${id}&key=kHMmzvAHEOjcQ4DCrsAoRQ`)
.then(response => {console.log("req AUTHOR"); return response.text()})
.then(parseXML)

const fetchBook = id =>
fetch(`https://www.goodreads.com/book/show/${id}.xml?key=kHMmzvAHEOjcQ4DCrsAoRQ`)
.then(response => {console.log("req BOOKS"); return response.text()})
  .then(parseXML)

app.use('/graphql', graphqlHTTP( req => {

  const authorLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchAuthor)))

  const bookLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchBook)))

  return {
    schema,
    context: {
      authorLoader,
      bookLoader
    },
    graphiql: true
  }
}))

app.listen(4000)
console.log('Listening ...')