let express = require('express');
let characterController = require('../controllers/character');
let router = express.Router();

router.get('/getList', characterController.getCharacters);

module.exports = router;