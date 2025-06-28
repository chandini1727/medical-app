const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  symptoms: [String],
  image: String,
  stock: { type: Number, required: true }
});

module.exports = mongoose.model('Medicine', medicineSchema);
