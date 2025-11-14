const express = require('express');
const mongoose = require('mongoose');
const {sum} = require('./app')
const Developer = require('./models/developerModel')
const User = require('./models/userModel')
const Blog = require('./models/blogModel')
const userRoutes = require('./routes/userRoutes')
const developerRoutes = require('./routes/developerRoutes')

const app = express(); 

app.use(express.json())  // middleware

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
    const uri = "mongodb+srv://webeducators:webeducators12345@development.axnxetr.mongodb.net/initial-server"; 

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




// blog module




// auth module
app.use('/auth', userRoutes);

// developer module
app.use('/developer', developerRoutes);
















// health api
app.get('/', async (request, response)=>{
    console.log('Hello World')
    const developrss = await Developer.find()
    response.send(developrss)
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










//      C       R      U       D    
//    Create    Read   Update  Delete