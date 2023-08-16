const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required']
    },
    password: {
        type: String,
        require: [true, "Password required"]
    },
    img: {
        type: String
    }
})

const userCollection = mongoose.model('userCollection', userSchema);



module.exports = { userCollection };

