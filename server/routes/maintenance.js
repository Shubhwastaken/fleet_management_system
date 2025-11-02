const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');

// Get all maintenance records
router.get('/', async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT m.*, a.Model, a.Airline, t.Name as Technician_Name 
      FROM maintenance m 
      LEFT JOIN aircraft a ON m.Aircraft_ID = a.Aircraft_ID
      LEFT JOIN technician t ON m.Tech_ID = t.Tech_ID
      ORDER BY m.Date DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance data' });
  }
});

// Get maintenance by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM maintenance WHERE Maintenance_ID = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching maintenance:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance data' });
  }
});

// Get maintenance by aircraft ID
router.get('/aircraft/:aircraftId', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM maintenance WHERE Aircraft_ID = ? ORDER BY Date DESC',
      [req.params.aircraftId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching maintenance:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance data' });
  }
});

// Create new maintenance record
router.post('/', async (req, res) => {
  const { Maintenance_ID, Aircraft_ID, Tech_ID, Date, Type, Remark, Status } = req.body;
  try {
    const [result] = await promisePool.query(
      'INSERT INTO maintenance (Maintenance_ID, Aircraft_ID, Tech_ID, Date, Type, Remark, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Maintenance_ID, Aircraft_ID, Tech_ID, Date, Type, Remark, Status]
    );
    res.status(201).json({ message: 'Maintenance record created successfully', id: Maintenance_ID });
  } catch (error) {
    console.error('Error creating maintenance:', error);
    res.status(500).json({ error: 'Failed to create maintenance record' });
  }
});

// Update maintenance record
router.put('/:id', async (req, res) => {
  const { Aircraft_ID, Tech_ID, Date, Type, Remark, Status } = req.body;
  try {
    const [result] = await promisePool.query(
      'UPDATE maintenance SET Aircraft_ID = ?, Tech_ID = ?, Date = ?, Type = ?, Remark = ?, Status = ? WHERE Maintenance_ID = ?',
      [Aircraft_ID, Tech_ID, Date, Type, Remark, Status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    res.json({ message: 'Maintenance record updated successfully' });
  } catch (error) {
    console.error('Error updating maintenance:', error);
    res.status(500).json({ error: 'Failed to update maintenance record' });
  }
});

// Delete maintenance record
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM maintenance WHERE Maintenance_ID = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    res.json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting maintenance:', error);
    res.status(500).json({ error: 'Failed to delete maintenance record' });
  }
});

module.exports = router;
