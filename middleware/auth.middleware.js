const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token recibido en verifyToken:", token); 
    if (!token) return res.redirect('/');

    jwt.verify(token, process.env.S_KEY, (err, decoded) => {
        if (err) return res.redirect('/');
        req.userId = decoded.userId;
        console.log('Token válido, pasando al siguiente middleware...');
        next();
    });
};

module.exports = {
    verifyToken
}