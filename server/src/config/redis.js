const { createClient } = require('redis');

const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
    console.log("reds error", err)
})

const connectRedis = async () => {
    try{
        await redisClient.connect();
        console.log("Redis connected successully");

        await redisClient.set("hireflow:test", "hello");

        const value = await redisClient.get("hireflow:test");

        console.log("Redis Test Value:", value);
    }catch(error){
        console.log("connectng error", error)
    }
}

module.exports = {redisClient, connectRedis};