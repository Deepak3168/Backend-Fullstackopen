const express = require ('express')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/persons')

const app = express()
app.use(express.static('dist'))
app.use(express.json());
app.use(cors())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-133456"
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

app.get('/',(request,response)=> {
    response.send('<h1>Hello world </h1> </br> <p>Here is our api on /api/persons</p>');
})
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
  
  app.get('/api/notes/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })


app.get('/info',(request,response)=> {
    const date = new Date
    response.send(`<p>Phonebook has info for  people </p> <br/> <p> ${date}</p>`)
})

app.post('/api/persons',(request,response)=> {
    const body = request.body
    if (body.name == undefined){
        return response.status(400).json({error:'content missing'})
    }
    const person = new Person({
        name:body.name,
        number:body.number,
    })
    person.save().then(savedNote => {
        response.json(savedNote)
    })

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( person => person.id !== id)
    response.status(204).end()
})



const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`server running at port ${PORT}`)
})