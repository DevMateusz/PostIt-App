const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/postsController');
const auth = require('../../middleware/auth')

router.get('/logged/:sort/:search?', auth, postsController.getPostsLogged);
router.get('/guest/:sort/:search?', postsController.getPostsGuest);



module.exports = router;