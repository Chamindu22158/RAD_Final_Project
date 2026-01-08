"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("../config/db");
const Product_1 = __importDefault(require("../models/Product"));
const products = [
    {
        name: 'Orange Juice',
        description: 'Fresh squeezed orange juice, 100% natural',
        price: 4.99,
        category: 'juice',
        image: 'https://example.com/orange-juice.jpg',
        ingredients: ['Orange'],
        alcoholBrands: [],
        isFamous: false
    },
    {
        name: 'Apple Juice',
        description: 'Crisp and refreshing apple juice',
        price: 3.99,
        category: 'juice',
        image: 'https://example.com/apple-juice.jpg',
        ingredients: ['Apple'],
        alcoholBrands: [],
        isFamous: false
    },
    {
        name: 'Grape Juice',
        description: 'Sweet and tangy grape juice',
        price: 5.49,
        category: 'juice',
        image: 'https://example.com/grape-juice.jpg',
        ingredients: ['Grape'],
        alcoholBrands: [],
        isFamous: false
    },
    {
        name: 'Pineapple Juice',
        description: 'Tropical pineapple juice, vitamin C rich',
        price: 4.29,
        category: 'juice',
        image: 'https://example.com/pineapple-juice.jpg',
        ingredients: ['Pineapple'],
        alcoholBrands: [],
        isFamous: false
    }
];
const run = async () => {
    await (0, db_1.connectDB)();
    const existing = await Product_1.default.countDocuments();
    if (existing > 0) {
        console.log('Products already exist:', existing);
        process.exit(0);
    }
    await Product_1.default.insertMany(products);
    console.log('Products seeded:', products.length);
    process.exit(0);
};
run().catch(err => {
    console.error(err);
    process.exit(1);
});
