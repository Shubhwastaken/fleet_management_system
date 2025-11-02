const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all aircraft
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM aircraft');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    res.status(500).json({ error: 'Failed to fetch aircraft data' });
  }
});

// Get aircraft by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM aircraft WHERE Aircraft_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    res.status(500).json({ error: 'Failed to fetch aircraft data' });
  }
});

// Create new aircraft
router.post('/', async (req, res) => {
  const { Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status } = req.body;
  try {
    const [result] = await promisePool.query(
      'INSERT INTO aircraft (Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status]
    );
    res.status(201).json({ message: 'Aircraft created successfully', id: Aircraft_ID });
  } catch (error) {
    console.error('Error creating aircraft:', error);
    res.status(500).json({ error: 'Failed to create aircraft' });
  }
});

// Update aircraft
router.put('/:id', async (req, res) => {
  const { Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status } = req.body;
  try {
    const [result] = await promisePool.query(
      'UPDATE aircraft SET Model = ?, Capacity = ?, Manufacture_Date = ?, Airline = ?, Last_Known_Loc = ?, Status = ? WHERE Aircraft_ID = ?',
      [Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json({ message: 'Aircraft updated successfully' });
  } catch (error) {
    console.error('Error updating aircraft:', error);
    res.status(500).json({ error: 'Failed to update aircraft' });
  }
});

// Delete aircraft
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM aircraft WHERE Aircraft_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json({ message: 'Aircraft deleted successfully' });
  } catch (error) {
    console.error('Error deleting aircraft:', error);
    res.status(500).json({ error: 'Failed to delete aircraft' });
  }
});

// Get aircraft statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const [stats] = await promisePool.query(`
      SELECT 
        COUNT(*) as totalAircraft,
        SUM(CASE WHEN Status = 'Active' THEN 1 ELSE 0 END) as activeFlights,
        SUM(CASE WHEN Status = 'Maintenance' THEN 1 ELSE 0 END) as maintenance,
        SUM(Capacity) as totalCapacity
      FROM aircraft
    `);
    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
