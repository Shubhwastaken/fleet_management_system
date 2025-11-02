# Quick Start Guide - Aviation Fleet Management System

## ⚠️ IMPORTANT: Prerequisites

Before you can run this project, you need to install:

### 1. Node.js (Required)
Node.js was **not detected** on your system. You need to install it:

1. Download Node.js from: https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
3. Run the installer and follow the instructions
4. **Restart your computer** after installation
5. Verify installation by opening PowerShell and running:
   ```bash
   node --version
   npm --version
   ```

### 2. MySQL (Required)
Make sure MySQL is installed and running:

1. Download from: https://dev.mysql.com/downloads/installer/
2. Choose "MySQL Installer for Windows"
3. Install MySQL Server 8.0+ 
4. Remember your **root password** - you'll need it!

---

## 🗄️ Step 1: Setup Database

### Option A: Using MySQL Command Line

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE airplanedb;
exit;

# Import all tables (run each command)
mysql -u root -p airplanedb < database/airplanedb_airport.sql
mysql -u root -p airplanedb < database/airplanedb_aircraft.sql
mysql -u root -p airplanedb < database/airplanedb_technician.sql
mysql -u root -p airplanedb < database/airplanedb_flight.sql
mysql -u root -p airplanedb < database/airplanedb_maintenance.sql
mysql -u root -p airplanedb < database/airplanedb_tracking_log.sql
```

### Option B: Using MySQL Workbench (Easier)

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Click "Create New Schema" button
4. Name it: **airplanedb**
5. Click "Apply"
6. For each SQL file in the `database` folder:
   - File → Open SQL Script
   - Select the file
   - Click the lightning bolt ⚡ to execute
   - Repeat for all 6 files

---

## 🔧 Step 2: Configure Environment

1. Open the `.env` file in the root folder
2. Update with YOUR MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=airplanedb
DB_PORT=3306

PORT=5000
NODE_ENV=development
```

**IMPORTANT:** Replace `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL root password!

---

## 📦 Step 3: Install Dependencies

**AFTER installing Node.js**, open PowerShell in the project folder and run:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

---

## 🚀 Step 4: Run the Application

### Option 1: Run everything together (Recommended)
```bash
npm run dev
```

### Option 2: Run separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

---

## 🌐 Access the Application

Once running:
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📋 What You'll See

The application has 6 main tabs:

1. **Dashboard** - Overview of fleet statistics
2. **Fleet** - View all aircraft and their details
3. **Tracking** - Real-time tracking data
4. **Maintenance** - Maintenance schedules and records
5. **TCL** - Transaction Control demonstrations (COMMIT, ROLLBACK, SAVEPOINT)
6. **DCL** - Data Control demonstrations (GRANT, REVOKE, User Management)

---

## ✅ Testing TCL Operations

1. Go to the **TCL tab**
2. Click "Execute Rollback Demo"
   - This demonstrates transaction rollback on error
   - Check the result box for details
3. Click "Execute Savepoint Demo"
   - This shows how to use savepoints in transactions
   - Only partial changes are committed

---

## ✅ Testing DCL Operations

1. Go to the **DCL tab**
2. Click "Create Aircraft Manager"
   - Creates a user with specific privileges
3. Click "Create Read-Only User"
   - Creates a user with SELECT-only access
4. Click "List Users"
   - Shows all database users

---

## 🐛 Common Issues

### Issue: "node is not recognized"
**Solution:** Install Node.js and restart your computer

### Issue: "Cannot connect to database"
**Solution:** 
- Make sure MySQL is running
- Check your credentials in `.env` file
- Verify database `airplanedb` exists

### Issue: "Port 3000 already in use"
**Solution:** Close other applications using that port or change it:
```bash
# In client/package.json, modify start script:
"start": "set PORT=3001 && react-scripts start"
```

### Issue: "Port 5000 already in use"
**Solution:** Change PORT in `.env` file:
```env
PORT=5001
```

---

## 📞 Need Help?

If you encounter issues:
1. Check that Node.js is installed: `node --version`
2. Check that MySQL is running
3. Verify all dependencies are installed: `npm install`
4. Check the console for error messages

---

## 🎓 Project Features Explained

### TCL (Transaction Control Language)
- **COMMIT**: Saves all changes in a transaction
- **ROLLBACK**: Undoes all changes if error occurs
- **SAVEPOINT**: Creates a point to rollback to without losing everything

### DCL (Data Control Language)
- **GRANT**: Gives users permissions
- **REVOKE**: Removes user permissions
- **CREATE USER**: Creates new database users
- **DROP USER**: Removes database users

---

## 📝 Next Steps

1. Install Node.js if not installed
2. Setup MySQL database
3. Configure .env file
4. Install dependencies
5. Run the application
6. Explore the features!

Good luck! 🚀
