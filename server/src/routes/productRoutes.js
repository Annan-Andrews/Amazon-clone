const express = require('express');
const { getAllProducts, getProductById } = require('../controller/productControllers');


const router = express.Router()

router.get("/getAllProducts", getAllProducts);

router.get("/getProduct/:id", getProductById);

module.exports = {productRouter : router}