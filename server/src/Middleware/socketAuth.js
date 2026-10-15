const cookie = require('cookie')
const jwt = require('jsonwebtoken');

const socketAuth = (socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie;

        if(!cookieHeader){
            return next(new Error('Authentication required'));
        }

    const cookies = cookie.parse(cookieHeader);
    const token = cookies.token;

    if(!token){
        return next(new Error("Authentication token missing"));
    }

     // Existing Express middleware ki tarah JWT verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Authenticated user ki information socket par available hogi
    socket.user = decoded;

    next();

    }catch(error){
        next(new Error("Invalid or expired authentication token"));
    }
}

module.exports = socketAuth;