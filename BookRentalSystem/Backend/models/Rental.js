const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    rentalDate: { type: Date, default: Date.now },
    dueDate: { type: Date, default: () => Date.now() + 10 * 24 * 60 * 60 * 1000 },  // 10 days from rental
    returnDate: { type: Date },
    fine: { type: Number, default: 0 }
});

rentalSchema.methods.calculateFine = function() {
    const daysOverdue = Math.ceil((Date.now() - this.dueDate) / (1000 * 60 * 60 * 24));
    return daysOverdue > 0 ? daysOverdue : 0;
};

module.exports = mongoose.model('Rental', rentalSchema);
