const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all tracking logs
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT t.*, a.Model, a.Airline 
      FROM tracking_log t 
      LEFT JOIN aircraft a ON t.Aircraft_ID = a.Aircraft_ID
      ORDER BY t.Timestamp DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tracking logs:', error);
    res.status(500).json({ error: 'Failed to fetch tracking data' });
  }
});

// Get tracking by aircraft ID
router.get('/aircraft/:aircraftId', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM tracking_log WHERE Aircraft_ID = ? ORDER BY Timestamp DESC',
      [req.params.aircraftId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tracking:', error);
    res.status(500).json({ error: 'Failed to fetch tracking data' });
  }
});

// Create new tracking log
router.post('/', async (req, res) => {
  const { Tracking_ID, Aircraft_ID, Timestamp, Speed, Altitude, Longitude, Latitude, Status } = req.body;
  try {
    const [result] = await promisePool.query(
      'INSERT INTO tracking_log (Tracking_ID, Aircraft_ID, Timestamp, Speed, Altitude, Longitude, Latitude, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [Tracking_ID, Aircraft_ID, Timestamp, Speed, Altitude, Longitude, Latitude, Status]
    );
    res.status(201).json({ message: 'Tracking log created successfully', id: Tracking_ID });
  } catch (error) {
    console.error('Error creating tracking log:', error);
    res.status(500).json({ error: 'Failed to create tracking log' });
  }
});

module.exports = router;
