import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Plant from './models/plant.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await Plant.deleteMany({});
    console.log('Existing plants cleared.');

    const plantsData = JSON.parse(fs.readFileSync('./sample-plants.json', 'utf-8'));
    await Plant.insertMany(plantsData);
    console.log('Database has been seeded successfully! 🌱');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();