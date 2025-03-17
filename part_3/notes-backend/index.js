require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

const requestLogger = (request, response, next) => {
  console.log ('Method:', request.method)
  console.log ('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)


//routing

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

app.get ('/api/notes/:id', (request, response, next) => {
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
    next(error)
  })
})

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

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  
  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then(updateNote => { 
      if (updateNote) {
        response.json(updateNote)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({message: 'malformatted id'})
  } 
  next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`)
})