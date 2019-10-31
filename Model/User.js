const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    email:{
        type:String,
        required:true,
        max: 255,
        min: 6
    },
    password:{
        type:String,
        required:true,
        min: 6,
        max: 1024
    },
    date:{
        type:Date,
        default: Date.now()
        
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);