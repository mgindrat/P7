const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const stuffCtrl = require('../controllers/stuff');


router.get('/', stuffCtrl.getAllBooks);
router.post('/', auth, stuffCtrl.createBook);
router.get('/:id', stuffCtrl.getOneBooks);
router.put('/:id', auth, stuffCtrl.modifyBooks);
router.delete('/:id', auth, stuffCtrl.deleteBooks);


module.exports = router;