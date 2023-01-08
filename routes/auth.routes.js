const authController = require('../controllers/auth.controller');
const router = require('express').Router();

//************************** CREATE ******************************************//

router.post("/register", authController.register);
router.post("/login", authController.logIn);
router.get("/logout", authController.logout);