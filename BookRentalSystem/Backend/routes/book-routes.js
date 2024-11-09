const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookControllers');

router.post('/addbook', bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);




module.exports = router;
