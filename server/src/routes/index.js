const express = require('express')
const { userRouter } = require('./userRoutes')
const { productRouter } = require('./productRoutes')

const router = express.Router()

router.use('/user', userRouter)
router.use('/product', productRouter)


module.exports = {apiRouter: router}