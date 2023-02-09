const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
})

const getTasks = (request, response) => {
    pool.query('SELECT * FROM todo;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTodoId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM todo WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
  
const createTodo = (request, response) => {
    const { todo } = request.body

    pool.query('INSERT INTO todo (todo) VALUES ($1);', [todo], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Todo added with ID: ${results.insertId}`)
    })
}

const updateTodo = (request, response) => {
    const id = parseInt(request.params.id)
    const { todo } = request.body

    pool.query(
        'UPDATE todo SET todo = $2 WHERE id = $1',
        [id, todo],
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Todo modified with ID: ${id}`)
        }
    )
}

const deleteTodo = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM todo WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Todo deleted with ID: ${id}`)
    })
}
  

module.exports = {
    getTasks,
    getTodoId,
    createTodo,
    updateTodo,
    deleteTodo,
}