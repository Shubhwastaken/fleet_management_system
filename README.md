# Aviation Fleet Management System

A full-stack web application for managing aviation fleet operations with **TCL (Transaction Control Language)** and **DCL (Data Control Language)** implementations.

## 🚀 Features

- **Dashboard**: Real-time overview of fleet statistics
- **Fleet Management**: View and manage aircraft details
- **Flight Tracking**: Monitor real-time flight information
- **Maintenance Management**: Track maintenance schedules and status
- **TCL Operations**: Transaction management with COMMIT, ROLLBACK, and SAVEPOINT
- **DCL Operations**: User and privilege management with GRANT and REVOKE

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** or **yarn** package manager

## 🗄️ Database Setup

### Step 1: Import Database

1. Open MySQL Workbench or MySQL Command Line
2. Create the database:
   ```sql
   CREATE DATABASE airplanedb;
   ```

3. Import all SQL files from the `database` folder:
   ```bash
   mysql -u root -p airplanedb < database/airplanedb_airport.sql
   mysql -u root -p airplanedb < database/airplanedb_aircraft.sql
   mysql -u root -p airplanedb < database/airplanedb_technician.sql
   mysql -u root -p airplanedb < database/airplanedb_flight.sql
   mysql -u root -p airplanedb < database/airplanedb_maintenance.sql
   mysql -u root -p airplanedb < database/airplanedb_tracking_log.sql
   ```

   Or manually import each file through MySQL Workbench.

### Step 2: Configure Database Connection

1. Open the `.env` file in the root directory
2. Update the database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=airplanedb
   DB_PORT=3306
   ```

## 📦 Installation

### Step 1: Install Backend Dependencies

```bash
# In the project root directory
npm install
```

### Step 2: Install Frontend Dependencies

```bash
# Navigate to client folder
cd client
npm install
cd ..
```

## 🏃 Running the Application

### Option 1: Run Both Server and Client Together

```bash
npm run install-all
npm run dev
```

### Option 2: Run Separately

**Terminal 1 - Backend Server:**
```bash
npm run server
```
Server will run on: `http://localhost:5000`

**Terminal 2 - Frontend Client:**
```bash
npm run client
```
Client will run on: `http://localhost:3000`

## 🔐 TCL (Transaction Control Language) Features

The application demonstrates various TCL operations:

### 1. Transaction with COMMIT
- Execute multiple database operations as a single transaction
- All changes are committed together

### 2. Transaction with ROLLBACK
- Demonstrates automatic rollback on errors
- Ensures data integrity

### 3. SAVEPOINT Usage
- Create savepoints within transactions
- Rollback to specific savepoints without losing all changes

### Example: Maintenance Transaction
```javascript
// Schedule maintenance and update aircraft status in a single transaction
POST /api/tcl/maintenance-transaction
{
  "Aircraft_ID": 1,
  "Maintenance_ID": 100,
  "Tech_ID": 5,
  "Date": "2025-11-10",
  "Type": "Engine Overhaul",
  "Remark": "Scheduled maintenance"
}
```

## 🔑 DCL (Data Control Language) Features

The application includes DCL operations for user and privilege management:

### 1. Create Users
- Aircraft Manager User (SELECT, INSERT, UPDATE on aircraft)
- Read-Only User (SELECT on all tables)
- Maintenance Technician User (maintenance table privileges)

### 2. Grant Privileges
```javascript
POST /api/dcl/grant
{
  "username": "aircraft_manager",
  "host": "localhost",
  "privileges": ["SELECT", "INSERT", "UPDATE"],
  "database": "airplanedb",
  "table": "aircraft"
}
```

### 3. Revoke Privileges
```javascript
POST /api/dcl/revoke
{
  "username": "aircraft_manager",
  "host": "localhost",
  "privileges": ["UPDATE"],
  "database": "airplanedb",
  "table": "aircraft"
}
```

### 4. Show User Privileges
```javascript
GET /api/dcl/show-grants/aircraft_manager?host=localhost
```

## 📡 API Endpoints

### Aircraft
- `GET /api/aircraft` - Get all aircraft
- `GET /api/aircraft/:id` - Get aircraft by ID
- `POST /api/aircraft` - Create new aircraft
- `PUT /api/aircraft/:id` - Update aircraft
- `DELETE /api/aircraft/:id` - Delete aircraft
- `GET /api/aircraft/stats/overview` - Get statistics

### Flights
- `GET /api/flights` - Get all flights
- `POST /api/flights` - Create new flight
- `PUT /api/flights/:id` - Update flight
- `DELETE /api/flights/:id` - Delete flight

### Maintenance
- `GET /api/maintenance` - Get all maintenance records
- `GET /api/maintenance/aircraft/:aircraftId` - Get by aircraft
- `POST /api/maintenance` - Create maintenance record
- `PUT /api/maintenance/:id` - Update maintenance
- `DELETE /api/maintenance/:id` - Delete maintenance

### Tracking
- `GET /api/tracking` - Get all tracking logs
- `GET /api/tracking/aircraft/:aircraftId` - Get by aircraft
- `POST /api/tracking` - Create tracking log

### TCL Operations
- `POST /api/tcl/transaction` - Execute transaction
- `POST /api/tcl/demo-rollback` - Demo rollback
- `POST /api/tcl/demo-savepoint` - Demo savepoint
- `POST /api/tcl/maintenance-transaction` - Maintenance transaction
- `GET /api/tcl/isolation-level` - Get isolation level
- `POST /api/tcl/isolation-level` - Set isolation level

### DCL Operations
- `POST /api/dcl/create-user` - Create database user
- `POST /api/dcl/grant` - Grant privileges
- `POST /api/dcl/revoke` - Revoke privileges
- `GET /api/dcl/show-grants/:username` - Show user grants
- `DELETE /api/dcl/drop-user/:username` - Drop user
- `GET /api/dcl/users` - List all users

## 🛠️ Technology Stack

**Frontend:**
- React.js
- Axios for API calls
- Lucide React for icons
- Custom CSS

**Backend:**
- Node.js
- Express.js
- MySQL2
- dotenv for environment variables

**Database:**
- MySQL 8.0+

## 📁 Project Structure

```
dbms_project/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Styles
│   │   ├── api.js         # API client
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json
├── server/                # Node.js backend
│   ├── config/
│   │   └── database.js    # Database connection
│   ├── routes/
│   │   ├── aircraft.js    # Aircraft routes
│   │   ├── flights.js     # Flight routes
│   │   ├── maintenance.js # Maintenance routes
│   │   ├── tracking.js    # Tracking routes
│   │   ├── airports.js    # Airport routes
│   │   ├── technicians.js # Technician routes
│   │   ├── tcl.js         # TCL operations
│   │   └── dcl.js         # DCL operations
│   └── index.js           # Server entry point
├── database/              # SQL dump files
│   ├── airplanedb_aircraft.sql
│   ├── airplanedb_airport.sql
│   ├── airplanedb_flight.sql
│   ├── airplanedb_maintenance.sql
│   ├── airplanedb_technician.sql
│   └── airplanedb_tracking_log.sql
├── .env                   # Environment variables
├── package.json           # Backend dependencies
└── README.md             # This file
```

## 🔍 Testing TCL Operations

1. Navigate to the **TCL tab** in the application
2. Click "Execute Rollback Demo" to see transaction rollback
3. Click "Execute Savepoint Demo" to see savepoint usage
4. Check the console logs for detailed transaction flow

## 🔒 Testing DCL Operations

1. Navigate to the **DCL tab** in the application
2. Click "Create Aircraft Manager" to create a user with specific privileges
3. Click "Create Read-Only User" for read-only access
4. Click "List Users" to see all database users
5. Use MySQL Workbench to verify user privileges

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `airplanedb` exists

### Port Already in Use
- Change port in `.env` file
- Kill process using the port

### Cannot Find Module Error
- Run `npm install` in root directory
- Run `npm install` in client directory

## 📝 License

This project is for educational purposes.

## 👥 Contributors

DBMS Project Team

## 📧 Support

For issues and questions, please create an issue in the repository.
