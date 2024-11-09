const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    try {
        const { title, author, price, publication, genre } = req.body;

        // Ensure all fields are provided
        if (!title || !author || !price || !genre || !publication) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create the book with all required fields
        const book = new Book({ title, author, price, publication, genre });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error("Error creating book:", error); // Log error for more details
        res.status(500).json({ error: error.message });
    }
};


exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('genre');
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('genre');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


