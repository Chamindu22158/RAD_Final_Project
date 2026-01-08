"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const validateProduct = (req, res, next) => {
    const { category, image, name } = req.body;
    if (!category || !image || !name)
        return res.status(400).json({ message: 'category, image and name required' });
    next();
};
exports.validateProduct = validateProduct;
