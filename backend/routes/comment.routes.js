const commentController = require('../controllers/comment.controller');
const {restrain_access} = require('../middleware/middlewares');
const router = require('express').Router();

//********************** CREATE **********************************************//

router.post('/create', restrain_access, commentController.create);

//********************** READ ************************************************//

router.get('/:_id', commentController.commentById);
router.get('/userid/:author', commentController.userComments);

//********************** UPDATE **********************************************//

router.patch('/:_id', restrain_access, commentController.update);
router.post('/like/:_id', restrain_access, commentController.like);
router.post('/dislike/:_id', restrain_access, commentController.dislike);

//********************** DELETE **********************************************//

router.delete('/:_id', restrain_access, commentController.delete);

module.exports = router;