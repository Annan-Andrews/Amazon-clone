const express = require('express');
const { userSignup, userLogin, userLogout, checkUser, googleLogin } = require('../controller/userControllers');
const userAuth = require('../middleware/userAuth');
const router = express.Router()


// signup
router.post('/signup', userSignup)

// login
router.post('/login', userLogin)

// Logout
router.get('/logout',userAuth, userLogout)

// check user
router.get("/check-user", userAuth, checkUser);

// google login
router.post('/auth/google', googleLogin)


module.exports = { userRouter: router };