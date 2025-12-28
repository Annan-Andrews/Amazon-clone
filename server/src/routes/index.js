const express = require('express')
const { userRouter } = require('./userRoutes')
const { productRouter } = require('./productRoutes')
const { orderRouter } = require('./orderRoutes')

const router = express.Router()

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)


module.exports = {apiRouter: router}