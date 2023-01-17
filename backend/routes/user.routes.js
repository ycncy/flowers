const userController = require('../controllers/user.controller');
const {restrain_access} = require('../middlewares/middleware');
const router = require('express').Router();

//************************** CREATE ******************************************//

router.post("/register", userController.register);
router.post("/login", userController.logIn);
router.post("/logout", userController.logout);

//************************* GETTERS ******************************************//

router.get("/all-users", restrain_access, userController.getAllUsers);
router.get("/token/:token", userController.getUserByToken);
router.get("/username/:username", userController.getUserByUsername);

//********************** DEL/UPDATE ******************************************//

router.delete("/:token", restrain_access, userController.delete);
router.patch("/:token", restrain_access, userController.updateData);

//********************** FOLLOW **********************************************//

router.get("/follows/:username", userController.getFollow);
router.post("/add-follower", restrain_access, userController.addFollower);
router.post("/remove-follower", restrain_access, userController.removeFollower);

module.exports = router;