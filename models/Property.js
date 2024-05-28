const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    default: []
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

const Property = mongoose.model('property', PropertySchema);

module.exports = Property;
