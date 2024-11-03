const jwt = require("jsonwebtoken");


const verify_user = (req, res, next) => {
    const authHeader = req.headers["cookie"];
    if(!authHeader){
        return res.redirect('/');
    }
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

const verify_admin = (req, res, next) => {
    const authHeader = req.headers["cookie"];
    if(!authHeader){
        return res.redirect('/');
    }
    const token = authHeader.split('; ').find(cookie => cookie.startsWith('token_admin='));
    if (token) {
        const actualToken = token.split('=')[1];
        jwt.verify(actualToken, process.env.S_KEY_ADMIN, (error, decoded) => {
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

module.exports = {
    verify_user,
    verify_admin,
};