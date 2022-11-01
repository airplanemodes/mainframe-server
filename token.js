const jwt = require('jsonwebtoken');

function createToken(user_id) {
   return jwt.sign({ id: user_id }, "TEST", { expiresIn: "10h" });
};

function authToken(req, res, next) {
    let validToken = req.header("x-auth-token");
    if (!validToken) {
        return res.status(401).json({ msg: "Token needed" });
    }

    try {
        let decodeToken = jwt.verify(validToken, "TEST");
        req.tokenData = decodeToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Token invalid or expired" });        
    }
};



module.exports = {
    createToken,
    authToken
};