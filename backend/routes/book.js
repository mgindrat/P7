const express = require('express');
const router = express.Router();

// Importation des middlewares et du controlleur stuff 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const bookCtrl = require('../controllers/book');

// Différentes utilisations des routes
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBooks);
router.get('/bestrating', bookCtrl.getBestRating);
router.post('/', auth, multer, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.ratingBooks)
router.put('/:id', auth, multer, bookCtrl.modifyBooks);
router.delete('/:id', auth, bookCtrl.deleteBooks);


//Exportation router
module.exports = router;