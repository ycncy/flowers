const userController = require('../controllers/user.controller');
const {restrain_access} = require('../middlewares/middleware');
const router = require('express').Router();

//************************** CREATE ******************************************//

router.post("/register", userController.register);
router.post("/login", userController.logIn);
router.post("/logout", userController.logout);

//************************* GETTERS ******************************************//

router.get("/all-users", restrain_access, userController.getAllUsers);
router.get("/:_id", userController.getUserById);

//********************** DEL/UPDATE ******************************************//

router.delete("/:_id", restrain_access, userController.delete);
router.patch("/:_id", restrain_access, userController.updateData);

//********************** FOLLOW **********************************************//

router.get("/follows/:_id", userController.getFollow);
router.post("/add-follower", restrain_access, userController.addFollower);
router.post("/remove-follower", restrain_access, userController.removeFollower);

module.exports = router;