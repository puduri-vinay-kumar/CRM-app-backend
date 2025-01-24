const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // The token is usually sent as a Bearer token
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid or expired token' });
        }
        req.user = user; // Attach the decoded user payload to the request
        next();
    });
};

module.exports = authenticateToken;
