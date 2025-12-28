const express = require("express");
const userAuth = require("../middleware/userAuth");
const { createOrder, getUserOrders } = require("../controller/orderControllers");
const router = express.Router();

router.post("/create-order", userAuth, createOrder);
router.get("/get-orders", userAuth, getUserOrders);

module.exports = { orderRouter: router };