const db = require('./queries')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
console.log(`App running on port ${port}.`)
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
app.get('/tasks', db.getTasks)
app.get('/tasks/:id', db.getTodoId)
app.post('/tasks', db.createTodo)
app.put('/tasks/:id', db.updateTodo)
app.delete('/tasks/:id', db.deleteTodo)