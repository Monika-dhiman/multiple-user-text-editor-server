const mongoose = require('mongoose')

const Schema = mongoose.Schema()

const users = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        required: true
    }
})

const Users = mongoose.model('Users', users)

module.exports = Users;