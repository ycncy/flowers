const userController = require('../controllers/user.controller');
const {restrain_access, isAdmin} = require('../middleware/middlewares');
const jwt = require("jsonwebtoken");
const router = require('express').Router();

//************************** CREATE ******************************************//

router.post("/register", userController.register);
router.post("/login", userController.logIn);
router.post("/logout", userController.logout);
router.get('/get-session', restrain_access, userController.authCheck);

//************************* GETTERS ******************************************//

router.get("/all-users", userController.getAllUsers);
router.get("/:_id", isAdmin, userController.getUserById);

//********************** DEL/UPDATE ******************************************//

router.delete("/:_id", restrain_access, userController.delete);
router.patch("/:_id", restrain_access, userController.updateData);

//********************** FOLLOW **********************************************//

router.get("/follows/:_id", userController.getFollow);
router.post("/add-follower", restrain_access, userController.addFollower);
router.post("/remove-follower", restrain_access, userController.removeFollower);

router.use((req, res, next) => {
    const {token} = req.query;
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (!err) {
                user.token = token;
                res.locals.user = user;
            }
        })
    }
    next();
})

module.exports = router;