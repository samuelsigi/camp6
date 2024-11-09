const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/RentalControllers');

router.post('/addmember', rentalController.createRental);
router.get('/', rentalController.getRentals);
router.post('/:id', rentalController.returnBook);



module.exports = router;
