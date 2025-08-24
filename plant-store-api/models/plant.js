import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, description: { type: String, required: true, default: 'A beautiful plant to brighten up your home.' },
  bestConditions: { type: String, required: true, default: 'Loves bright, indirect light and regular watering.' },
  maxGrowth: { type: String, required: true, default: 'Can grow up to 2-3 feet tall.' },
}, { timestamps: true });

// Create a text index to enable efficient text search on name and categories
plantSchema.index({ name: 'text', categories: 'text' });

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;