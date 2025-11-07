const mongoose = require('mongoose');

const developerShema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Developer', developerShema);