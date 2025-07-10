const mongoose = require('mongoose');

const readRecordSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    date: { type: Date, required: true },
    pagesRead: { type: Number, required: true, min: 0 },
    readingTimeMinutes: { type: Number, required: true, min: 0 },
    note: { type: String, trim: true }
});

const ReadRecord = mongoose.model('ReadRecord', readRecordSchema);

module.exports = ReadRecord;
