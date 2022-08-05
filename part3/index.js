const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

    app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

    app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
                   <p>${new Date}</p>`)
  })

    app.get('/api/persons/:id', (request, response) => {
    id = Number(request.params.id)
    const person = persons.find((curr) => curr.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    })

    app.delete('/delete/:id', (request, response) => {
        id = Number(request.params.id)

    persons = persons.find((curr) => curr.id !== id)

    response.status(450).end()
    })


    const generateId = () => {
      const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
      return maxId + 1
    }

    app.post('/api/persons', (request, response) => {
      const body = request.body
      console.log(request.body)

      if (!body) {
        return response.status(400).json({error: "content missing"})
      }

      if (!body.name || !body.number) {
        return response.status(401).json({error: "name or number missing"})
      }

      const unique = persons.find(curr => curr.name === body.name) 
      console.log(unique)

      if (unique) {
        return response.status(401).json({error: "name must be unique"})
      }

      const person =  { 
        id: generateId(),
        name: body.name, 
        number: body.number
        }

      persons = persons.concat(person)

      response.json(person)
    })




  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })