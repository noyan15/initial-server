const express = require('express');
const mongoose = require('mongoose');
const {sum} = require('./app')

const app = express(); 

app.use(express.json())

var developers = [
    {
        name: 'Jack',
        age: 22,
        id:1
    },
    {
        name: 'John',
        age: 22,
        id:2
    },
    {
        name: 'John',
        age: 22,
        id:3
    },
    {
        name: 'Jane',
        age: 22,
        id:4
    }
]

// Replace with your MongoDB connection string
    const uri = "mongodb+srv://webeducators:webeducators12345@development.axnxetr.mongodb.net/"; 

    async function connectToMongoDBWithMongoose() {
      try {
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB with Mongoose!");
      } catch (error) {
        console.error("Error connecting to MongoDB with Mongoose:", error);
      }
    }

    connectToMongoDBWithMongoose();


// custom middlewares


// health api
app.get('/', (request, response)=>{
    console.log('Hello World')
    response.send(developers)
})


// fetching data
app.get('/sum', (request, response)=>{
    const result = sum(2,3)
    response.send(`The sum of 2 and 3 is ${result}`)
})


// sum middleware
function sumMiddleware (request, response, next) {
    const {num1, num2} = request.body;
    if(num1 > 50 || num2 > 50){
        console.log('request has been returned from middleware')
        return response.send('num1 and num2 should be less than 50, this error is from middleware')
    }
    const rslt = sum(num1, num2);
    request.result = rslt;
    next();
}

// insertion,   addition
app.post('/sum', sumMiddleware, (request, response)=>{
    console.log('request recieved')
    const result = request.result
    response.send(`The sum is ${result}`)
})

// add developer
// api

// get specific developer
app.get('/get-developer/:id', (request, response)=> {
    const {id} = request.params;
    const developer = developers.find(developer=> developer.id == id)
    response.send(developer)
})

//  update  
app.patch('/update-developer/:id', (request, response)=>{
    console.log(request.params)

    const {id} = request.params
    const {name,age} = request.body;
    // const {id} = request.params

    const index = developers.findIndex(develepor => develepor.id == id)
    developers[index].name = name
    developers[index].age = age
    
    response.send(`updated developer is ${developers[index]}`)
})

// delete
app.delete('/delete-developer/:id', (request,response) =>{
    const {id} = request.params;
    const index = developers.findIndex(developer=> developer.id == id)
    developers.splice(index, 1)
    response.send('developer has been deleted successfully')
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})



// assignment 
// POST API for adding a new developer
// middlewares for developes APIs









// nodemon




//        frontend   --->(request)              Backend
//        Frontend   <---(response)             Backend
//        Frontend     ---> (sends-request)    (recieve-request) Backend  --->  routes  -->  middleware  -->  function  
