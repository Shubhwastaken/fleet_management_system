// Test Database Connection Script
// Run this to verify your database is set up correctly
// Usage: node test-db.js

require('dotenv').config();
const mysql = require('mysql2/promise');

async function testDatabase() {
  console.log('\n🔍 Testing Database Connection...\n');
  
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('✅ Successfully connected to MySQL database!');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    console.log(`🖥️  Host: ${process.env.DB_HOST}:${process.env.DB_PORT}\n`);

    // Test each table
    const tables = ['aircraft', 'airport', 'flight', 'maintenance', 'technician', 'tracking_log'];
    
    console.log('📋 Checking tables and data:\n');
    
    for (const table of tables) {
      const [rows] = await connection.query(`SELECT COUNT(*) as count FROM ${table}`);
      const count = rows[0].count;
      console.log(`   ${table.padEnd(15)} ✓ ${count} records`);
    }

    // Sample data
    console.log('\n📝 Sample Aircraft Data:');
    const [aircraft] = await connection.query('SELECT * FROM aircraft LIMIT 3');
    aircraft.forEach(a => {
      console.log(`   - ${a.Model} (${a.Airline}) - Status: ${a.Status}`);
    });

    console.log('\n✅ Database is properly set up and ready to use!');
    console.log('\n🚀 You can now start the server with: npm run server\n');

    await connection.end();

  } catch (error) {
    console.error('❌ Database connection failed!\n');
    console.error('Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Make sure MySQL is running');
    console.error('   2. Check your .env file has the correct password');
    console.error('   3. Verify database "airplanedb" exists');
    console.error('   4. Run complete_setup.sql to create the database\n');
    process.exit(1);
  }
}

testDatabase();
