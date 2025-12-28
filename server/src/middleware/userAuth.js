var jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "user not autherised", success: false });
        }

        const tokenVerified = await jwt.verify(token, process.env.JWT_SECRET);
        
        if (!tokenVerified) {
            return res.status(401).json({ message: "user not autherised", success: false });
        }

        req.user = tokenVerified;

        req.userData = await User.findById(tokenVerified.id);

        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "user autherization failed", success: false });
    }
};


module.exports = userAuth