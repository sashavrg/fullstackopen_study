require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/note')
const app = express()

const password = process.argv[2]

//middleware
app.use(express.static('dist'))
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get ('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.statusMessage = "Note not found"
    response.status(404).end()
  }
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
    response.json(notes)
    console.log(notes)
  })
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0

  return String(maxId + 1)
}

app.post ('/api/notes/', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`)
})