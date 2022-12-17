const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.put('/friend/:id/add', userController.addToFriends);
router.put('/friend/:id/remove', userController.removeFromFriends);

module.exports = router;