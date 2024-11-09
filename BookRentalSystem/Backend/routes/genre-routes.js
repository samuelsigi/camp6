const express = require('express');
const router = express.Router();
const genreController = require('../controllers/GenreControllers');

router.post('/addgenre', genreController.createGenre);
router.get('/', genreController.getGenres);
router.patch('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);


router.get("/:genreId", genreController.getBooksByGenre);



module.exports = router;
