const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

/**
 * DCL (Data Control Language) Operations
 * - GRANT
 * - REVOKE
 * - CREATE USER
 * - DROP USER
 */

// Create a new database user
router.post('/create-user', async (req, res) => {
  const { username, password, host = 'localhost' } = req.body;
  
  try {
    const connection = await pool.promise().getConnection();
    
    // Create user
    await connection.query(
      `CREATE USER IF NOT EXISTS '${username}'@'${host}' IDENTIFIED BY '${password}'`
    );
    console.log(`✅ User '${username}'@'${host}' created successfully`);

    connection.release();
    
    res.json({
      success: true,
      message: `User '${username}'@'${host}' created successfully`
    });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// Grant privileges to a user
router.post('/grant', async (req, res) => {
  const { username, host = 'localhost', privileges, database, table = '*' } = req.body;
  
  try {
    const connection = await pool.promise().getConnection();
    
    // Grant privileges
    const privilegeStr = Array.isArray(privileges) ? privileges.join(', ') : privileges;
    const grantQuery = `GRANT ${privilegeStr} ON ${database}.${table} TO '${username}'@'${host}'`;
    
    await connection.query(grantQuery);
    await connection.query('FLUSH PRIVILEGES');
    console.log(`✅ Granted ${privilegeStr} on ${database}.${table} to '${username}'@'${host}'`);

    connection.release();
    
    res.json({
      success: true,
      message: `Granted ${privilegeStr} privileges on ${database}.${table} to '${username}'@'${host}'`
    });
  } catch (error) {
    console.error('❌ Error granting privileges:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to grant privileges',
      error: error.message
    });
  }
});

// Revoke privileges from a user
router.post('/revoke', async (req, res) => {
  const { username, host = 'localhost', privileges, database, table = '*' } = req.body;
  
  try {
    const connection = await pool.promise().getConnection();
    
    // Revoke privileges
    const privilegeStr = Array.isArray(privileges) ? privileges.join(', ') : privileges;
    const revokeQuery = `REVOKE ${privilegeStr} ON ${database}.${table} FROM '${username}'@'${host}'`;
    
    await connection.query(revokeQuery);
    await connection.query('FLUSH PRIVILEGES');
    console.log(`✅ Revoked ${privilegeStr} on ${database}.${table} from '${username}'@'${host}'`);

    connection.release();
    
    res.json({
      success: true,
      message: `Revoked ${privilegeStr} privileges on ${database}.${table} from '${username}'@'${host}'`
    });
  } catch (error) {
    console.error('❌ Error revoking privileges:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to revoke privileges',
      error: error.message
    });
  }
});

// Show user privileges
router.get('/show-grants/:username', async (req, res) => {
  const { username } = req.params;
  const host = req.query.host || 'localhost';
  
  try {
    const connection = await pool.promise().getConnection();
    
    const [rows] = await connection.query(`SHOW GRANTS FOR '${username}'@'${host}'`);
    
    connection.release();
    
    res.json({
      success: true,
      user: `${username}@${host}`,
      grants: rows
    });
  } catch (error) {
    console.error('❌ Error showing grants:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to show grants',
      error: error.message
    });
  }
});

// Drop user
router.delete('/drop-user/:username', async (req, res) => {
  const { username } = req.params;
  const host = req.query.host || 'localhost';
  
  try {
    const connection = await pool.promise().getConnection();
    
    await connection.query(`DROP USER IF EXISTS '${username}'@'${host}'`);
    console.log(`✅ User '${username}'@'${host}' dropped successfully`);

    connection.release();
    
    res.json({
      success: true,
      message: `User '${username}'@'${host}' dropped successfully`
    });
  } catch (error) {
    console.error('❌ Error dropping user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to drop user',
      error: error.message
    });
  }
});

// Demo: Create user with specific privileges for aircraft management
router.post('/demo-create-aircraft-manager', async (req, res) => {
  const connection = await pool.promise().getConnection();
  
  try {
    const username = 'aircraft_manager';
    const password = 'manager123';
    const host = 'localhost';
    const database = process.env.DB_NAME;

    // Create user
    await connection.query(
      `CREATE USER IF NOT EXISTS '${username}'@'${host}' IDENTIFIED BY '${password}'`
    );
    console.log(`✅ User '${username}' created`);

    // Grant SELECT, INSERT, UPDATE on aircraft table
    await connection.query(
      `GRANT SELECT, INSERT, UPDATE ON ${database}.aircraft TO '${username}'@'${host}'`
    );
    console.log(`✅ Granted SELECT, INSERT, UPDATE on aircraft table`);

    // Grant SELECT on all other tables
    await connection.query(
      `GRANT SELECT ON ${database}.* TO '${username}'@'${host}'`
    );
    console.log(`✅ Granted SELECT on all tables`);

    await connection.query('FLUSH PRIVILEGES');

    connection.release();
    
    res.json({
      success: true,
      message: 'Aircraft manager user created with appropriate privileges',
      username: username,
      host: host,
      privileges: {
        aircraft: ['SELECT', 'INSERT', 'UPDATE'],
        otherTables: ['SELECT']
      }
    });
  } catch (error) {
    console.error('❌ Error:', error);
    connection.release();
    res.status(500).json({
      success: false,
      message: 'Failed to create aircraft manager user',
      error: error.message
    });
  }
});

// Demo: Create read-only user
router.post('/demo-create-readonly-user', async (req, res) => {
  const connection = await pool.promise().getConnection();
  
  try {
    const username = 'readonly_user';
    const password = 'readonly123';
    const host = 'localhost';
    const database = process.env.DB_NAME;

    // Create user
    await connection.query(
      `CREATE USER IF NOT EXISTS '${username}'@'${host}' IDENTIFIED BY '${password}'`
    );
    console.log(`✅ User '${username}' created`);

    // Grant only SELECT privilege
    await connection.query(
      `GRANT SELECT ON ${database}.* TO '${username}'@'${host}'`
    );
    console.log(`✅ Granted SELECT on all tables`);

    await connection.query('FLUSH PRIVILEGES');

    connection.release();
    
    res.json({
      success: true,
      message: 'Read-only user created successfully',
      username: username,
      host: host,
      privileges: ['SELECT']
    });
  } catch (error) {
    console.error('❌ Error:', error);
    connection.release();
    res.status(500).json({
      success: false,
      message: 'Failed to create read-only user',
      error: error.message
    });
  }
});

// Demo: Create maintenance technician user
router.post('/demo-create-technician-user', async (req, res) => {
  const connection = await pool.promise().getConnection();
  
  try {
    const username = 'maintenance_tech';
    const password = 'tech123';
    const host = 'localhost';
    const database = process.env.DB_NAME;

    // Create user
    await connection.query(
      `CREATE USER IF NOT EXISTS '${username}'@'${host}' IDENTIFIED BY '${password}'`
    );

    // Grant privileges on maintenance table
    await connection.query(
      `GRANT SELECT, INSERT, UPDATE ON ${database}.maintenance TO '${username}'@'${host}'`
    );

    // Grant SELECT on aircraft and technician tables
    await connection.query(
      `GRANT SELECT ON ${database}.aircraft TO '${username}'@'${host}'`
    );
    await connection.query(
      `GRANT SELECT ON ${database}.technician TO '${username}'@'${host}'`
    );

    await connection.query('FLUSH PRIVILEGES');

    connection.release();
    
    res.json({
      success: true,
      message: 'Maintenance technician user created successfully',
      username: username,
      host: host,
      privileges: {
        maintenance: ['SELECT', 'INSERT', 'UPDATE'],
        aircraft: ['SELECT'],
        technician: ['SELECT']
      }
    });
  } catch (error) {
    console.error('❌ Error:', error);
    connection.release();
    res.status(500).json({
      success: false,
      message: 'Failed to create technician user',
      error: error.message
    });
  }
});

// List all users
router.get('/users', async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();
    const [rows] = await connection.query('SELECT User, Host FROM mysql.user');
    connection.release();
    
    res.json({
      success: true,
      users: rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
