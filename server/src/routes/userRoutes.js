const express = require('express');
const { userSignup, userLogin } = require('../controller/userControllers');
const router = express.Router()


// signup
router.post('/signup', userSignup)

// login
router.post('/login', userLogin)


module.exports = { userRouter: router };