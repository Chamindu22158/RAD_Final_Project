"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const productService = __importStar(require("../services/product.service"));
const createProduct = async (req, res, next) => {
    try {
        const p = await productService.createProductService(req.body);
        res.status(201).json(p);
    }
    catch (err) {
        next(err);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, next) => {
    try {
        const updated = await productService.updateProductService(req.params.id, req.body);
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProductService(req.params.id);
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProduct = deleteProduct;
const getProducts = async (req, res, next) => {
    try {
        const category = req.query.category;
        const search = req.query.search;
        const isFamous = req.query.isFamous === 'true' ? true : req.query.isFamous === 'false' ? false : undefined;
        const products = await productService.listProductsService(category, search, isFamous);
        res.json(products);
    }
    catch (err) {
        next(err);
    }
};
exports.getProducts = getProducts;
const getProduct = async (req, res, next) => {
    try {
        const p = await productService.getProductService(req.params.id);
        if (!p)
            return res.status(404).json({ message: 'Not found' });
        res.json(p);
    }
    catch (err) {
        next(err);
    }
};
exports.getProduct = getProduct;
