const Genre = require('../models/Genre');
const Book = require('../models/Book')

exports.createGenre = async (req, res) => {
    try {
        const genre = new Genre(req.body);
        await genre.save();
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        // Find and delete the genre by ID
        const genre = await Genre.findByIdAndDelete(req.params.id);
        
        // If the genre does not exist, send a 404 error
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        
        // Delete all books under this genre
        await Book.deleteMany({ genre: req.params.id });
        
        // Send success response
        res.json({ message: 'Genre and associated books deleted successfully' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
};

exports.getBooksByGenre = async (req, res) => {
    try {
      const { genreId } = req.params;
  
      const books = await Book.find({ genre: genreId }).populate("genre", "name");
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };