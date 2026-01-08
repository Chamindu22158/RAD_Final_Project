import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../config/db';
import Product from '../models/Product';

const products = [
  {
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice, 100% natural',
    price: 4.99,
    category: 'juice',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
    ingredients: ['Orange'],
    alcoholBrands: [],
    isFamous: false
  },
  {
    name: 'Apple Juice',
    description: 'Crisp and refreshing apple juice',
    price: 3.99,
    category: 'juice',
    image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop',
    ingredients: ['Apple'],
    alcoholBrands: [],
    isFamous: false
  },
  {
    name: 'Grape Juice',
    description: 'Sweet and tangy grape juice',
    price: 5.49,
    category: 'juice',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=300&fit=crop',
    ingredients: ['Grape'],
    alcoholBrands: [],
    isFamous: false
  },
  {
    name: 'Pineapple Juice',
    description: 'Tropical pineapple juice, vitamin C rich',
    price: 4.29,
    category: 'juice',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop',
    ingredients: ['Pineapple'],
    alcoholBrands: [],
    isFamous: false
  }
];

const run = async () => {
  await connectDB();
  const existing = await Product.countDocuments();
  
  if (existing > 0) {
    console.log('Updating existing products with new images...');
    // Update existing products with new image URLs
    for (const productData of products) {
      await Product.findOneAndUpdate(
        { name: productData.name }, // Find by name
        { image: productData.image }, // Update image
        { new: true }
      );
    }
    console.log('Products updated with new images:', products.length);
  } else {
    await Product.insertMany(products);
    console.log('Products seeded:', products.length);
  }
  
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
