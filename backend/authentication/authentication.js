const { Users } = require('./data/authentication.data')


function setUser(req, res, next) {
    const userID = req.body.userID;
    if (userID) {
        req.user = Users.find(user => user.userID === userID)
    }
    next()
}



function authUser(req, res, next) {
    if (req.user == null) {
        return res.status(403).json({ message: "Not authorized" })
    } else {
        next()
    }

}


function authrole(role) {
    return (req, res, next) => {
        if (req.user.userRole !== role) {
            return res.status(401).json({ message: 'Access Denied' })
        }
        next()
    }
}

module.exports = { setUser, authUser, authrole }