"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: 'Unauthorized' });
        if (user.role !== role)
            return res.status(403).json({ message: 'Forbidden' });
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
