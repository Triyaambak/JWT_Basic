const jwt = require('jsonwebtoken');
const {Unauthenticated} = require('../errors/index');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Unauthenticated('No Token Provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new Unauthenticated('No Token Provided');
    }
}

module.exports = authenticationMiddleware;