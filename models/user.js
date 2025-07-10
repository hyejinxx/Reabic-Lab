const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true, unique: true, trim: true, lowercase: true},
    password: { type: String, required: true, minlength: 6},
    createdAt: { type: Date, default: Date.now},
    age: { type: Number, min: 0 },
    gender : { type: Number, enum: [0, 1, 2], default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
