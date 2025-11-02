const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all flights
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT f.*, a.Model, a.Airline 
      FROM flight f 
      LEFT JOIN aircraft a ON f.Aircraft_ID = a.Aircraft_ID
      ORDER BY f.Departure_Time DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'Failed to fetch flights data' });
  }
});

// Get flight by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM flight WHERE Flight_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching flight:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
});

// Create new flight
router.post('/', async (req, res) => {
  const { Flight_ID, Aircraft_ID, Origin, Destination, Departure_Time, Arrival_Time, Attribute } = req.body;
  try {
    const [result] = await promisePool.query(
      'INSERT INTO flight (Flight_ID, Aircraft_ID, Origin, Destination, Departure_Time, Arrival_Time, Attribute) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Flight_ID, Aircraft_ID, Origin, Destination, Departure_Time, Arrival_Time, Attribute]
    );
    res.status(201).json({ message: 'Flight created successfully', id: Flight_ID });
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ error: 'Failed to create flight' });
  }
});

// Update flight
router.put('/:id', async (req, res) => {
  const { Aircraft_ID, Origin, Destination, Departure_Time, Arrival_Time, Attribute } = req.body;
  try {
    const [result] = await promisePool.query(
      'UPDATE flight SET Aircraft_ID = ?, Origin = ?, Destination = ?, Departure_Time = ?, Arrival_Time = ?, Attribute = ? WHERE Flight_ID = ?',
      [Aircraft_ID, Origin, Destination, Departure_Time, Arrival_Time, Attribute, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight updated successfully' });
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ error: 'Failed to update flight' });
  }
});

// Delete flight
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM flight WHERE Flight_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ error: 'Failed to delete flight' });
  }
});

module.exports = router;
