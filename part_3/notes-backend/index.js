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

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
    response.json(notes)
    console.log(notes)
  })
})

app.get ('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
  .then(note => {
    if (note) {
      response.json(note)
    } else {
      response.statusMessage = "Note not found"
      response.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({error: 'malformatted id'})
  })
})

/*const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0

  return String(maxId + 1)
}
*/

app.post ('/api/notes/', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
    //id: generateId(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
    console.log(savedNote)
  })
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