const Rental = require('../models/Rental');
const Book = require('../models/Book');

exports.createRental = async (req, res) => {
    try {
        const { bookId, memberId } = req.body;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const rental = new Rental({
            book: bookId,
            member: memberId,
            dueDate: Date.now() + 10 * 24 * 60 * 60 * 1000  // 10 days from now
        });

        await rental.save();
        res.status(201).json(rental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRentals = async (req, res) => {
    try {
        const rentals = await Rental.find().populate('book').populate('member');
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) return res.status(404).json({ message: 'Rental not found' });

        rental.returnDate = Date.now();

        // Calculate fine if the book is returned late
        const daysOverdue = Math.ceil((rental.returnDate - rental.dueDate) / (1000 * 60 * 60 * 24));
        rental.fine = daysOverdue > 0 ? daysOverdue : 0;

        await rental.save();
        res.json({ rental, message: `Fine: Rs. ${rental.fine}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRentalById = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id).populate('book').populate('member');
        if (!rental) return res.status(404).json({ message: 'Rental not found' });
        res.json(rental);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
