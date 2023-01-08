const commentController = require('../controllers/comment.controller');
const router = require('express').Router();

//********************** CREATE **********************************************//

router.post('/create', commentController.create);

//********************** READ ************************************************//

router.get('/:_id', commentController.commentById);
router.get('/userid/:author', commentController.userComments);

//********************** UPDATE **********************************************//

router.patch('/:_id', commentController.update);
router.post('/like/:_id', commentController.like);
router.post('/dislike/:_id', commentController.dislike);

//********************** DELETE **********************************************//

router.delete('/:_id', commentController.delete);

module.exports = router;