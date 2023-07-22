const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique : true
    },
    age: {
        type : Number,
        default : 0
    },
    grade: {
        type : Number,
    },
    address: {
        type : String,
        required: true,
        default : null
    }

})

const user = mongoose.model("user",userSchema);

module.exports = user;