const userController = require('../controllers/user.controller');
const router = require('express').Router();

//************************* GETTERS ******************************************//

router.get("/all-users", userController.getAllUsers);
router.get("/:_id", userController.getUserById);

//********************** DEL/UPDATE ******************************************//

router.delete("/:_id", userController.delete);
router.patch("/:_id", userController.updateData);

//********************** FOLLOW **********************************************//

router.get("/follows/:_id", userController.getFollow);
router.post("/add-follower", userController.addFollower);
router.post("/remove-follower", userController.removeFollower);

module.exports = router;