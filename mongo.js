
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password/name/number as argument')
  process.exit(1)
}

const password = process.argv[2]
const encodedPassword = encodeURIComponent(password);
//const name = process.argv[3]
//const number = process.argv[4]

const url =
        `mongodb+srv://deepak128:${encodedPassword}@persondata.qencbf4.mongodb.net/?retryWrites=true&w=majority&appName=PersonData`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

/*
const `mongodb+srv://deepak128:${encodedPassword}@persondata.qencbf4.mongodb.net/?retryWrites=true&w=majority&appName=PersonData`person = new Person ({
  name: name,
  number: number,
})

person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook `)
  mongoose.connection.close()
})

*/
console.log("Phonebook:")
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number} `);
    })
    mongoose.connection.close()
  })

