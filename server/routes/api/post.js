const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');

router.put('/:id', postController.updatePost);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost );
router.put('/:id/like', postController.likePost)
router.put('/:id/dislike', postController.dislikePost)

module.exports = router;