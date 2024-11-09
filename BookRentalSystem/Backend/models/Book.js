const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publication: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }
});

bookSchema.methods.calculateRentalRate = function() {
    return this.price * 0.05;
};

module.exports = mongoose.model('Book', bookSchema);
