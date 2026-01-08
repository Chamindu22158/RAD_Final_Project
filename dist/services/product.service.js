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
exports.getProductService = exports.listProductsService = exports.deleteProductService = exports.updateProductService = exports.createProductService = void 0;
const productRepo = __importStar(require("../repositories/product.repository"));
const createProductService = async (payload) => {
    return productRepo.createProductRepo(payload);
};
exports.createProductService = createProductService;
const updateProductService = async (id, payload) => {
    return productRepo.updateProductRepo(id, payload);
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    return productRepo.deleteProductRepo(id);
};
exports.deleteProductService = deleteProductService;
const listProductsService = async (category, search, isFamous) => {
    const filter = {};
    if (category)
        filter.category = category;
    if (search)
        filter.search = search;
    if (isFamous !== undefined)
        filter.isFamous = isFamous;
    return productRepo.findProductsRepo(filter);
};
exports.listProductsService = listProductsService;
const getProductService = async (id) => {
    return productRepo.findProductById(id);
};
exports.getProductService = getProductService;
