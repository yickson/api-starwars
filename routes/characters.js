let express = require('express');
let characterController = require('../controllers/character');
let router = express.Router();

router.get('/getList', characterController.getCharacters);
router.get('/getCharacter/:id', characterController.getCharacter);
router.post('/add', characterController.addCharacter);
router.put('/update/:id', characterController.updateCharacter);
router.delete('/delete/:id', characterController.deleteCharacter);

module.exports = router;