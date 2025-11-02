const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

/**
 * TCL (Transaction Control Language) Operations
 * - START TRANSACTION
 * - COMMIT
 * - ROLLBACK
 * - SAVEPOINT
 */

// Start a transaction and perform multiple operations
router.post('/transaction', async (req, res) => {
  const connection = await pool.promise().getConnection();
  
  try {
    await connection.beginTransaction();
    console.log('✅ Transaction started');

    const { operations } = req.body;
    const results = [];

    for (const operation of operations) {
      const { type, data } = operation;
      let result;

      switch (type) {
        case 'INSERT_AIRCRAFT':
          [result] = await connection.query(
            'INSERT INTO aircraft (Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [data.Aircraft_ID, data.Model, data.Capacity, data.Manufacture_Date, data.Airline, data.Last_Known_Loc, data.Status]
          );
          results.push({ type, success: true, id: data.Aircraft_ID });
          break;

        case 'UPDATE_AIRCRAFT':
          [result] = await connection.query(
            'UPDATE aircraft SET Status = ? WHERE Aircraft_ID = ?',
            [data.Status, data.Aircraft_ID]
          );
          results.push({ type, success: true, affectedRows: result.affectedRows });
          break;

        case 'INSERT_MAINTENANCE':
          [result] = await connection.query(
            'INSERT INTO maintenance (Maintenance_ID, Aircraft_ID, Tech_ID, Date, Type, Remark, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [data.Maintenance_ID, data.Aircraft_ID, data.Tech_ID, data.Date, data.Type, data.Remark, data.Status]
          );
          results.push({ type, success: true, id: data.Maintenance_ID });
          break;

        case 'UPDATE_MAINTENANCE':
          [result] = await connection.query(
            'UPDATE maintenance SET Status = ? WHERE Maintenance_ID = ?',
            [data.Status, data.Maintenance_ID]
          );
          results.push({ type, success: true, affectedRows: result.affectedRows });
          break;

        default:
          throw new Error(`Unknown operation type: ${type}`);
      }
    }

    await connection.commit();
    console.log('✅ Transaction committed successfully');

    res.json({
      success: true,
      message: 'Transaction committed successfully',
      results
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Transaction rolled back due to error:', error);
    res.status(500).json({
      success: false,
      message: 'Transaction rolled back',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Demonstration: Insert aircraft with automatic rollback on error
router.post('/demo-rollback', async (req, res) => {
  const connection = await pool.promise().getConnection();
  
  try {
    await connection.beginTransaction();
    console.log('✅ Transaction started - Demo Rollback');

    // Insert valid aircraft
    await connection.query(
      'INSERT INTO aircraft (Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [999, 'Test Aircraft', 200, '2023-01-01', 'Test Airlines', 'Test City', 'Active']
    );
    console.log('✅ Inserted aircraft with ID 999');

    // Intentionally cause an error (duplicate key or invalid data)
    await connection.query(
      'INSERT INTO aircraft (Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [999, 'Duplicate Aircraft', 200, '2023-01-01', 'Test Airlines', 'Test City', 'Active']
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.log('✅ Transaction rolled back successfully - Data not persisted');
    res.json({
      success: true,
      message: 'Rollback demonstration successful',
      info: 'Transaction was rolled back, no data was inserted',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Demonstration: Using SAVEPOINT
router.post('/demo-savepoint', async (req, res) => {
  const connection = await pool.promise().getConnection();
  
  try {
    await connection.beginTransaction();
    console.log('✅ Transaction started - Demo Savepoint');

    // First operation
    await connection.query(
      'INSERT INTO aircraft (Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [1001, 'Aircraft 1', 200, '2023-01-01', 'Airline A', 'City A', 'Active']
    );
    console.log('✅ Inserted aircraft 1001');

    // Create savepoint
    await connection.query('SAVEPOINT savepoint1');
    console.log('✅ Savepoint created: savepoint1');

    // Second operation
    await connection.query(
      'INSERT INTO aircraft (Aircraft_ID, Model, Capacity, Manufacture_Date, Airline, Last_Known_Loc, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [1002, 'Aircraft 2', 250, '2023-02-01', 'Airline B', 'City B', 'Active']
    );
    console.log('✅ Inserted aircraft 1002');

    // Rollback to savepoint (this will undo aircraft 1002 but keep 1001)
    await connection.query('ROLLBACK TO SAVEPOINT savepoint1');
    console.log('✅ Rolled back to savepoint1 - Aircraft 1002 insertion undone');

    // Commit the transaction (only aircraft 1001 will be saved)
    await connection.commit();
    console.log('✅ Transaction committed - Only aircraft 1001 persisted');

    res.json({
      success: true,
      message: 'Savepoint demonstration successful',
      info: 'Aircraft 1001 was saved, Aircraft 1002 was rolled back',
      savedAircraft: 1001
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Transaction rolled back:', error);
    res.status(500).json({
      success: false,
      message: 'Transaction failed',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Complex transaction: Schedule maintenance and update aircraft status
router.post('/maintenance-transaction', async (req, res) => {
  const connection = await pool.promise().getConnection();
  const { Aircraft_ID, Maintenance_ID, Tech_ID, Date, Type, Remark } = req.body;
  
  try {
    await connection.beginTransaction();
    console.log('✅ Starting maintenance transaction');

    // Create savepoint before operations
    await connection.query('SAVEPOINT before_maintenance');

    // Insert maintenance record
    await connection.query(
      'INSERT INTO maintenance (Maintenance_ID, Aircraft_ID, Tech_ID, Date, Type, Remark, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Maintenance_ID, Aircraft_ID, Tech_ID, Date, Type, Remark, 'Scheduled']
    );
    console.log('✅ Maintenance record created');

    // Update aircraft status to Maintenance
    const [result] = await connection.query(
      'UPDATE aircraft SET Status = ? WHERE Aircraft_ID = ?',
      ['Maintenance', Aircraft_ID]
    );

    if (result.affectedRows === 0) {
      throw new Error('Aircraft not found');
    }
    console.log('✅ Aircraft status updated to Maintenance');

    // Commit the transaction
    await connection.commit();
    console.log('✅ Transaction committed successfully');

    res.json({
      success: true,
      message: 'Maintenance scheduled and aircraft status updated',
      maintenanceId: Maintenance_ID,
      aircraftId: Aircraft_ID
    });

  } catch (error) {
    await connection.rollback();
    console.error('❌ Transaction rolled back:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule maintenance',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Get transaction isolation level
router.get('/isolation-level', async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();
    const [rows] = await connection.query('SELECT @@transaction_isolation as isolation_level');
    connection.release();
    
    res.json({
      success: true,
      isolationLevel: rows[0].isolation_level
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Set transaction isolation level
router.post('/isolation-level', async (req, res) => {
  const { level } = req.body; // READ-UNCOMMITTED, READ-COMMITTED, REPEATABLE-READ, SERIALIZABLE
  
  try {
    const connection = await pool.promise().getConnection();
    await connection.query(`SET SESSION TRANSACTION ISOLATION LEVEL ${level}`);
    connection.release();
    
    res.json({
      success: true,
      message: `Transaction isolation level set to ${level}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
