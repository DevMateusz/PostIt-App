const express = require('express');
const router = express.Router();
const registerControler = require('../controllers/registerController');

router.post('/', registerControler.createNewUser);

module.exports = router;