const postController = require('../controllers/post.controller');
const router = require('express').Router();

//********************** CREATE **********************************************//

router.post('/create', postController.create);

//********************** READ ************************************************//

router.get('/:_id', postController.postDetail);
router.get('/byuserid/:user_id', postController.postsByUserId);
router.get('/comments/:_id', postController.postComments);
router.get('/likes/:_id', postController.postLikes);

//********************** UPDATE **********************************************//

router.patch('/:_id', postController.update);
router.post('/comment/:_id', postController.addComment);
router.post('/like/:_id', postController.addLike);

//********************** DELETE **********************************************//

router.delete('/:_id', postController.delete);
router.delete('/comment/:_id', postController.deleteComment);
router.delete('/like/:_id', postController.deleteLike);

module.exports = router;