const express = require('express');
const { userSignup, userLogin, userLogout } = require('../controller/userControllers');
const userAuth = require('../middleware/userAuth');
const router = express.Router()


// signup
router.post('/signup', userSignup)

// login
router.post('/login', userLogin)

// Logout
router.get('/logout',userAuth, userLogout)


module.exports = { userRouter: router };