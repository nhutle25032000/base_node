const mongoose = require('./base');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    userName: String,
})

const User = new mongoose.model('User', userSchema);

