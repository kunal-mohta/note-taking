const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userData: {
      username: String,
      notes: [{
        title: String,
        content: String,
        labels: [String],
        color: String
      }]
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;