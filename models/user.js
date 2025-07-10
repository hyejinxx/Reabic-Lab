const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true, unique: true, trim: true, lowercase: true},
    password: { type: String, required: true, minlength: 6},
    createdAt: { type: Date, default: Date.now},
    age: { type: Number, min: 0 },
    gender : { type: Number, enum: [0, 1, 2], default: 0 },
    refreshToken: { type: String, default: null }
});


// Middleware to hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
   }
   next();
});

// userSchema.methods.generateJWT = function() {
//     const jwt = require('jsonwebtoken');
//     const token = jwt.sign(
//         { id: this._id, email: this.email },
//         process.env.JWT_SECRET,
//         { expiresIn: '7d' }
//     );
//     return token;
// };

// Import bcrypt for password hashing and comparison
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
