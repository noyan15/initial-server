const Developer = require('../models/developerModel');

exports.addDeveloper = async (request, response)=>{
    const {name, age} = request.body;
    Developer.create({name,age})
    response.send(`new developer has been added`)
}

exports.getSpecificDeveloper = async (request, response)=> {
    const {id} = request.params;
    const developer = await Developer.findById(id);
    response.send(developer)
}

exports.updateDeveloper = async (request, response)=>{
    console.log(request.params)

    const {id} = request.params
    const {name,age} = request.body;
    // const {id} = request.params

    const developer = await Developer.findByIdAndUpdate(id, {name,age})
    
    response.send(`updated developer is ${developer}`)
}

exports.deleteDeveloper = async (request,response) =>{
    const {id} = request.params;
    const developer = await Developer.deleteOne({_id: id})
    response.send('developer has been deleted successfully')
}