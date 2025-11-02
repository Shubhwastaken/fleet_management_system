const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all airports
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM airport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching airports:', error);
    res.status(500).json({ error: 'Failed to fetch airports data' });
  }
});

// Get airport by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM airport WHERE Airport_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching airport:', error);
    res.status(500).json({ error: 'Failed to fetch airport data' });
  }
});

module.exports = router;
