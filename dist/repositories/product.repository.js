"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProductById = exports.findProductsRepo = exports.deleteProductRepo = exports.updateProductRepo = exports.createProductRepo = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProductRepo = async (payload) => {
    const product = await Product_1.default.create(payload);
    return {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        ingredients: product.ingredients,
        alcoholBrands: product.alcoholBrands,
        isFamous: product.isFamous,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    };
};
exports.createProductRepo = createProductRepo;
const updateProductRepo = async (id, payload) => {
    const product = await Product_1.default.findByIdAndUpdate(id, payload, { new: true });
    if (!product)
        return null;
    return {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        ingredients: product.ingredients,
        alcoholBrands: product.alcoholBrands,
        isFamous: product.isFamous,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    };
};
exports.updateProductRepo = updateProductRepo;
const deleteProductRepo = async (id) => {
    return Product_1.default.findByIdAndDelete(id);
};
exports.deleteProductRepo = deleteProductRepo;
const findProductsRepo = async (filter = {}) => {
    const query = {};
    if (filter.category) {
        query.category = filter.category;
    }
    if (filter.isFamous !== undefined) {
        query.isFamous = filter.isFamous;
    }
    if (filter.search) {
        const searchRegex = new RegExp(filter.search, 'i');
        query.$or = [
            { name: searchRegex },
            { description: searchRegex },
            { ingredients: { $in: [searchRegex] } }
        ];
    }
    const products = await Product_1.default.find(query);
    return products.map(product => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        ingredients: product.ingredients,
        alcoholBrands: product.alcoholBrands,
        isFamous: product.isFamous,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }));
};
exports.findProductsRepo = findProductsRepo;
const findProductById = async (id) => {
    const product = await Product_1.default.findById(id);
    if (!product)
        return null;
    return {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        ingredients: product.ingredients,
        alcoholBrands: product.alcoholBrands,
        isFamous: product.isFamous,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    };
};
exports.findProductById = findProductById;
