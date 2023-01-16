const postController = require('../controllers/post.controller');
const {restrain_access, isAdmin} = require('../middlewares/middleware');
const router = require('express').Router();

//********************** CREATE **********************************************//

router.post('/create', restrain_access, postController.create);

//********************** READ ************************************************//

router.get('/:_id', postController.postDetail);
router.get('/byuserid/:user_id', postController.postsByUserId);
router.get('/comments/:_id', postController.postComments);
router.get('/likes/:_id', postController.postLikes);

//********************** UPDATE **********************************************//

router.patch('/:_id', restrain_access, postController.update);
router.post('/comment/:_id', restrain_access, postController.addComment);
router.post('/like/:_id', restrain_access, postController.addLike);

//********************** DELETE **********************************************//

router.delete('/:_id', restrain_access, postController.delete);
router.delete('/comment/:_id', postController.deleteComment);
router.delete('/like/:_id', postController.deleteLike);

module.exports = router;