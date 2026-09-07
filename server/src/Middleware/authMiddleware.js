const jwt = require('jsonwebtoken');

const Protect = (req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: 'Not authorized, no token'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({message: 'Not authorized, invalid token'});
    }
}

module.exports = Protect;