var mongoose = require('mongoose');

var wishListSchema = mongoose.Schema({
    title: String,
    description: String,
    content : String, 
    img: String,
});

var userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required:true,
        unique:true
    },
    salt: String,
    password: String,
    token: String,
    wishlist: [wishListSchema]
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;