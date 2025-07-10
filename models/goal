const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true },
    type: { type: String, enum: ['weekly', 'monthly'], required: true },
    targetPages: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
