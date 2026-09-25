const imageKit = require('imagekit');

const imagekit = new imageKit({
    publicKey: process.env.PUBLIC_KEY_IMAGEKIT,
    privateKey: process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint: process.env.URL_IMAGEKIT
});

module.exports = imagekit;