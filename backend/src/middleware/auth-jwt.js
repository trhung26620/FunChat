const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = require('../model/User')

let verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        let user = await User.findById(decoded.id);
        if (user) {
            req.userId = user.id;
            next();
        } else {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
    });
};

module.exports = verifyToken