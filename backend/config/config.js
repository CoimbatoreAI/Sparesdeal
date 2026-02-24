module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'sparesdeal_secret_key_2024',
    jwtExpiration: '1d',
    port: process.env.PORT || 5000,
};
