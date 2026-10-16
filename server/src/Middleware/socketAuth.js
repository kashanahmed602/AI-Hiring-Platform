
const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      console.log("Socket auth: Cookie header missing");
      return next(new Error("Authentication cookie missing"));
    }

    // Parse cookies without an external package
    const cookies = {};

    cookieHeader.split(";").forEach((part) => {
      const separatorIndex = part.indexOf("=");

      if (separatorIndex === -1) return;

      const name = part.slice(0, separatorIndex).trim();
      const value = part.slice(separatorIndex + 1).trim();

      cookies[name] = value;
    });

    const token = cookies.token;

    if (!token) {
      console.log("Socket auth: token cookie missing");
      return next(new Error("Token cookie missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      console.log("Socket auth: JWT payload has no id");
      return next(new Error("Invalid token payload"));
    }

    socket.user = decoded;
    next();
  } catch (error) {
    console.error(
      "Socket JWT verification failed:",
      error.name,
      error.message
    );

    next(new Error("Invalid or expired authentication token"));
  }
};

module.exports = socketAuth;
