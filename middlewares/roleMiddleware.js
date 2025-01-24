const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role; // `req.user` comes from the JWT middleware
        if (userRole !== requiredRole) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.',
            });
        }
        next();
    };
};

module.exports = roleMiddleware;
