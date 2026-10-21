const isDevelopment = process.env.NODE_ENV === 'development';

const authCookieOptions = {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? 'lax' : 'none'
};

module.exports = authCookieOptions;
