const jwt = require('jsonwebtoken');


function checkToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret")
    } catch (e) {
        return res.status(401).json({ message: "auth failed!" });
    }
    next();
}

module.exports = { checkToken } 