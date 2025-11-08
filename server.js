const express = require('express');
const mongoose = require('mongoose');
const {sum} = require('./app')
const Developer = require('./models/developerModel')
const User = require('./models/userModel')
const Blog = require('./models/blogModel')

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

// registration api
app.post('/register', async (request, response) => {
    const {firstName, lastName, email, age, password, confirmPassword} = request.body;

    if(password != confirmPassword){
        return response.send('password and confirm password do not match')
    }

    const user = User.create({
        firstName,
        lastName,
        email,
        age,
        password
    })

    response.send('user registered successfully')
})

app.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(user === null || user === undefined){
        return res.send('Account does not exist or email is incorrect')
    }

    if(user.password !== password){
        res.send('Password is incorrect')
    }else {
        res.send({
            message: 'Login successful',
            user: user
        })
    }
})

// change password api
app.post('/change-password', async (req,res)=>{
    const {email, oldPassword, newPassword, confirmNewPassword} = req.body;

    const user = await User.findOne({email: email});

    if(user === null || user === undefined){
        return res.send('Account does not exist or email is incorrect')
    }

    if(user.password !== oldPassword){
        return res.send('Old password is incorrect')
    }

    if(newPassword !== confirmNewPassword){
        return res.send('New password and confirm new password do not match')
    }

    user.password = newPassword;
    await user.save();

    res.send('Password changed successfully')

})
















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

// add developer
app.post('/add-developer', (request, response)=>{
    const {name, age} = request.body;
    Developer.create({name,age})
    response.send(`new developer has been added`)
})

// get specific developer
app.get('/get-developer/:id', async (request, response)=> {
    const {id} = request.params;
    const developer = await Developer.findById(id);
    response.send(developer)
})

//  update  
app.patch('/update-developer/:id', async (request, response)=>{
    console.log(request.params)

    const {id} = request.params
    const {name,age} = request.body;
    // const {id} = request.params

    const developer = await Developer.findByIdAndUpdate(id, {name,age})
    
    response.send(`updated developer is ${developer}`)
})

// delete
app.delete('/delete-developer/:id', async (request,response) =>{
    const {id} = request.params;
    const developer = await Developer.deleteOne({_id: id})
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










//      C       R      U       D    
//    Create    Read   Update  Delete