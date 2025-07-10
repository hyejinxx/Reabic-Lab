const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    thumbnail: { type: String, trim: true },
    category: { type: String, trim: true },
    pageCount: { type: Number },
    source: { type: String, trim: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
