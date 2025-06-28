const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicines: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);