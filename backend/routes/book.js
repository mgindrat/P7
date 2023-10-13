const express = require('express');
const router = express.Router();

// Importation des middlewares et du controlleur book
const auth = require('../middleware/auth');
const sharp = require('../middleware/sharp-config');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');


// Différentes utilisations des routes
router.post('/', auth, multer, sharp, bookCtrl.createBook);
router.put('/:id', auth, multer, sharp, bookCtrl.modifyBooks);
router.delete('/:id', auth, bookCtrl.deleteBooks);
router.post('/:id/rating', auth, bookCtrl.ratingBooks);
router.get('/bestrating', bookCtrl.getBestRating);
router.get('/:id', bookCtrl.getOneBooks);
router.get('/', bookCtrl.getAllBooks);

//Exportation router
module.exports = router;