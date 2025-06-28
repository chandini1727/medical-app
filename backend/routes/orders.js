const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Medicine = require('../models/Medicine');

// Get all medicines
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create order
router.post('/orders', auth, async (req, res) => {
  const { medicines, total } = req.body;
  try {
    // Validate medicines and stock
    const orderMedicines = await Promise.all(
      medicines.map(async (item) => {
        const medicine = await Medicine.findById(item.medicine);
        if (!medicine) throw new Error('Medicine not found');
        if (medicine.stock < item.quantity) throw new Error(`Insufficient stock for ${medicine.name}`);
        return { medicine: item.medicine, quantity: item.quantity };
      })
    );

    const order = new Order({
      user: req.user.id,
      medicines: orderMedicines,
      total,
    });
    await order.save();

    // Update stock
    await Promise.all(
      orderMedicines.map(async (item) => {
        await Medicine.findByIdAndUpdate(item.medicine, { $inc: { stock: -item.quantity } });
      })
    );

    res.json(order);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;