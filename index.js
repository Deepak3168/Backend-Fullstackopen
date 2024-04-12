const express = require ('express')
const cors = require('cors')

const app = express()

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

app.get('/api/persons/',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=> {
    const id = request.params.id
    console.log(id)
    const person = persons.find(person => person.id == id)
    console.log(person)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})


app.get('/info',(request,response)=> {
    const count = persons.length
    const date = new Date
    response.send(`<p>Phonebook has info for ${count} people </p> <br/> <p> ${date}</p>`)
})

app.post('/api/persons',(request,response)=> {
    const body = request.body
    if (!body.name) {
        response.status(400).json({
            error:"name is missing"
        })
    }
    const exist = persons.find(person => person.name==body.name)
    if((exist) || (!body.number)) {
        response.status(400).json({
            error:"name already exist or name must be unique "
        })
    }else {
        const person = {
            id:Math.floor(Math.random() * 100) + 1,
            name:body.name,
            number:body.number
        }
        persons=persons.concat(person)
        response.json(person)
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( person => person.id !== id)
    response.status(204).end()
})



const PORT = 3001

app.listen(PORT,() => {
    console.log(`server running at port ${PORT}`)
})