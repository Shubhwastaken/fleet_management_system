const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const aircraftRoutes = require('./routes/aircraft');
const flightRoutes = require('./routes/flights');
const maintenanceRoutes = require('./routes/maintenance');
const trackingRoutes = require('./routes/tracking');
const airportRoutes = require('./routes/airports');
const technicianRoutes = require('./routes/technicians');
const tclRoutes = require('./routes/tcl');
const dclRoutes = require('./routes/dcl');

// Use routes
app.use('/api/aircraft', aircraftRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/tcl', tclRoutes);
app.use('/api/dcl', dclRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
