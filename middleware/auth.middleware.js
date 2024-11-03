const jwt = require("jsonwebtoken");





module.exports = (req, res, next) => {
    const authHeader = req.headers["cookie"];
    if(!authHeader)
        return res.redirect('/');
    
    const token = authHeader.split('; ').find(cookie => cookie.startsWith('token='));
    if (token) {
        const actualToken = token.split('=')[1];
        jwt.verify(actualToken, process.env.S_KEY, (error, decoded) => {
            if(error)
                return res.redirect('/');
            req.userId = decoded.id;
            next();
        });
    }
    else{
        return res.redirect('/');

    };  
};