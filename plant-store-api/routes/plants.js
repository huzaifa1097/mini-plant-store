import express from 'express';
import Plant from '../models/plant.js';

const router = express.Router();

const adminAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Missing or invalid API key.' });
  }
};

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) {
      query.categories = category;
    }
    if (search) {
      query.$text = { $search: `"${search}"` };
    }
    const plants = await Plant.find(query).sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching plants', error: err.message });
  }
});

// GET /api/plants/:id - Get a single plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching plant', error: err.message });
  }
});

// POST /api/plants - Add a new plant (Admin protected)
router.post('/', adminAuth, async (req, res) => {
  // ... (your existing post logic is correct)
  const { name, price, categories, inStock, imageUrl } = req.body;
  if (!name || !price || !categories || !imageUrl) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }
  const plant = new Plant({ name, price, categories, inStock, imageUrl });
  try {
    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ message: 'Error creating plant', error: err.message });
  }
});

export default router;