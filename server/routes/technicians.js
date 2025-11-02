const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all technicians
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM technician');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching technicians:', error);
    res.status(500).json({ error: 'Failed to fetch technicians data' });
  }
});

// Get technician by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM technician WHERE Tech_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Technician not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching technician:', error);
    res.status(500).json({ error: 'Failed to fetch technician data' });
  }
});

module.exports = router;
