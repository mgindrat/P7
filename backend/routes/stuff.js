const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');

router.post('/', stuffCtrl.createBook);
router.put('/:id', stuffCtrl.modifyBooks);
router.delete('/:id', stuffCtrl.deleteBooks);
router.get('/:id', stuffCtrl.getOneBooks);
router.get('/', stuffCtrl.getAllBooks);

module.exports = router;