const jwt = require('jsonwebtoken');


function checkToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY)
    } catch (e) {
        return res.status(401).json({ message: "AUTHENTITCATION ERROR" });
    }
    next();
}

module.exports = { checkToken } 