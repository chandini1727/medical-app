const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

router.get('/suggest', async (req, res) => {
  const { symptoms } = req.query;
  if (!symptoms) return res.status(400).json({ msg: 'Symptoms are required' });

  const symptomArray = symptoms.split(',').map(s => s.trim().toLowerCase());
  try {
    const suggestions = await Medicine.find({
      symptoms: { $in: symptomArray }
    }).limit(5);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;