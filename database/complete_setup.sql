-- Aviation Fleet Management System
-- Complete Database Setup Script
-- Run this script in MySQL Workbench or MySQL Command Line

-- Step 1: Create Database
DROP DATABASE IF EXISTS airplanedb;
CREATE DATABASE airplanedb;
USE airplanedb;

-- Step 2: Create Tables

-- Airport Table
CREATE TABLE airport (
  Airport_ID INT NOT NULL,
  Name VARCHAR(50),
  City VARCHAR(50),
  Code VARCHAR(10),
  PRIMARY KEY (Airport_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Airport Data
INSERT INTO airport VALUES 
(1,'John F. Kennedy International','New York','JFK'),
(2,'Los Angeles International','Los Angeles','LAX'),
(3,'Dubai International','Dubai','DXB'),
(4,'Singapore Changi','Singapore','SIN'),
(5,'Frankfurt Airport','Frankfurt','FRA'),
(6,'Doha Hamad International','Doha','DOH'),
(7,'Indira Gandhi International','Delhi','DEL'),
(8,'Chhatrapati Shivaji Maharaj','Mumbai','BOM'),
(9,'Chicago O\'Hare','Chicago','ORD'),
(10,'Hong Kong International','Hong Kong','HKG');

-- Aircraft Table
CREATE TABLE aircraft (
  Aircraft_ID INT NOT NULL,
  Model VARCHAR(50),
  Capacity INT,
  Manufacture_Date DATE,
  Airline VARCHAR(50),
  Last_Known_Loc VARCHAR(100),
  Status VARCHAR(20),
  Last_Known_Loc_ID INT,
  PRIMARY KEY (Aircraft_ID),
  KEY fk_aircraft_location (Last_Known_Loc_ID),
  CONSTRAINT fk_aircraft_location FOREIGN KEY (Last_Known_Loc_ID) REFERENCES airport (Airport_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Aircraft Data
INSERT INTO aircraft VALUES 
(1,'Boeing 737',180,'2015-06-12','Delta Airlines','New York','Active',NULL),
(2,'Airbus A320',160,'2017-03-22','American Airlines','Los Angeles','Active',NULL),
(3,'Boeing 777',396,'2012-11-05','Emirates','Dubai','Maintenance',NULL),
(4,'Airbus A380',500,'2019-08-17','Singapore Airlines','Singapore','Active',NULL),
(5,'Boeing 747',416,'2010-02-13','Lufthansa','Frankfurt','Inactive',NULL),
(6,'Boeing 787',242,'2020-05-25','Qatar Airways','Doha','Active',NULL),
(7,'Bombardier Q400',78,'2016-07-19','IndiGo','Delhi','Active',NULL),
(8,'ATR 72',74,'2014-12-01','SpiceJet','Mumbai','Maintenance',NULL),
(9,'Boeing 737 MAX',200,'2021-01-10','United Airlines','Chicago','Active',NULL),
(10,'Airbus A350',325,'2018-09-15','Cathay Pacific','Hong Kong','Active',NULL);

-- Technician Table
CREATE TABLE technician (
  Tech_ID INT NOT NULL,
  Name VARCHAR(50),
  Certification VARCHAR(50),
  Contact VARCHAR(50),
  PRIMARY KEY (Tech_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Technician Data
INSERT INTO technician VALUES 
(1,'John Smith','Engine Specialist','john.smith@example.com'),
(2,'Alice Johnson','Avionics Engineer','alice.j@example.com'),
(3,'Robert Brown','Airframe Technician','robert.b@example.com'),
(4,'Emily Davis','Hydraulics Specialist','emily.d@example.com'),
(5,'Michael Wilson','Electrical Systems','mike.w@example.com'),
(6,'Sophia Taylor','Maintenance Planner','sophia.t@example.com'),
(7,'David Lee','Safety Inspector','david.l@example.com'),
(8,'Olivia Harris','Flight Systems Engineer','olivia.h@example.com'),
(9,'Daniel Clark','Quality Control','daniel.c@example.com'),
(10,'Emma Martinez','Fuel Systems Specialist','emma.m@example.com');

-- Flight Table
CREATE TABLE flight (
  Flight_ID INT NOT NULL,
  Aircraft_ID INT,
  Origin VARCHAR(50),
  Destination VARCHAR(50),
  Departure_Time DATETIME,
  Arrival_Time DATETIME,
  Attribute VARCHAR(50),
  Origin_Airport_ID INT,
  Destination_Airport_ID INT,
  PRIMARY KEY (Flight_ID),
  KEY Aircraft_ID (Aircraft_ID),
  KEY fk_flight_origin (Origin_Airport_ID),
  KEY fk_flight_dest (Destination_Airport_ID),
  CONSTRAINT fk_flight_dest FOREIGN KEY (Destination_Airport_ID) REFERENCES airport (Airport_ID),
  CONSTRAINT fk_flight_origin FOREIGN KEY (Origin_Airport_ID) REFERENCES airport (Airport_ID),
  CONSTRAINT flight_ibfk_1 FOREIGN KEY (Aircraft_ID) REFERENCES aircraft (Aircraft_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Flight Data
INSERT INTO flight VALUES 
(1,1,'New York','Los Angeles','2025-09-01 08:30:00','2025-09-01 11:30:00','Domestic',NULL,NULL),
(2,2,'Los Angeles','Chicago','2025-09-02 09:15:00','2025-09-02 13:00:00','Domestic',NULL,NULL),
(3,3,'Dubai','Singapore','2025-09-03 14:00:00','2025-09-03 20:00:00','International',NULL,NULL),
(4,4,'Singapore','Frankfurt','2025-09-04 22:00:00','2025-09-05 06:00:00','International',NULL,NULL),
(5,5,'Frankfurt','Doha','2025-09-05 07:30:00','2025-09-05 12:00:00','International',NULL,NULL),
(6,6,'Doha','New York','2025-09-06 15:00:00','2025-09-06 22:30:00','International',NULL,NULL),
(7,7,'Delhi','Mumbai','2025-09-07 06:45:00','2025-09-07 08:15:00','Domestic',NULL,NULL),
(8,8,'Mumbai','Dubai','2025-09-08 09:00:00','2025-09-08 11:30:00','International',NULL,NULL),
(9,9,'Chicago','Hong Kong','2025-09-09 13:00:00','2025-09-10 08:00:00','International',NULL,NULL),
(10,10,'Hong Kong','Singapore','2025-09-10 10:00:00','2025-09-10 13:30:00','International',NULL,NULL);

-- Maintenance Table
CREATE TABLE maintenance (
  Maintenance_ID INT NOT NULL,
  Aircraft_ID INT,
  Tech_ID INT,
  Date DATE,
  Type VARCHAR(50),
  Remark VARCHAR(100),
  Status VARCHAR(20),
  PRIMARY KEY (Maintenance_ID),
  KEY Aircraft_ID (Aircraft_ID),
  KEY Tech_ID (Tech_ID),
  CONSTRAINT maintenance_ibfk_1 FOREIGN KEY (Aircraft_ID) REFERENCES aircraft (Aircraft_ID),
  CONSTRAINT maintenance_ibfk_2 FOREIGN KEY (Tech_ID) REFERENCES technician (Tech_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Maintenance Data
INSERT INTO maintenance VALUES 
(1,1,1,'2025-08-01','Engine Check','No issues found','Completed'),
(2,2,2,'2025-08-03','Avionics Update','Firmware upgraded','Completed'),
(3,3,3,'2025-08-05','Airframe Inspection','Minor cracks repaired','Completed'),
(4,4,4,'2025-08-08','Hydraulics Check','Hydraulic fluid replaced','Completed'),
(5,5,5,'2025-08-10','Electrical Systems','Battery replaced','inprocess'),
(6,6,6,'2025-08-12','Routine Maintenance','All systems functional','Completed'),
(7,7,7,'2025-08-14','Safety Inspection','Passed all safety checks','Pending'),
(8,8,8,'2025-08-16','Flight Systems Test','Autopilot adjusted','Completed'),
(9,9,9,'2025-08-18','Quality Check','Approved for flight','Completed'),
(10,10,10,'2025-08-20','Fuel Systems Check','Fuel pump replaced','Completed');

-- Tracking Log Table
CREATE TABLE tracking_log (
  Tracking_ID INT NOT NULL,
  Aircraft_ID INT,
  Timestamp DATETIME,
  Speed INT,
  Altitude INT,
  Longitude FLOAT,
  Latitude FLOAT,
  Status VARCHAR(20),
  PRIMARY KEY (Tracking_ID),
  KEY Aircraft_ID (Aircraft_ID),
  CONSTRAINT tracking_log_ibfk_1 FOREIGN KEY (Aircraft_ID) REFERENCES aircraft (Aircraft_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Tracking Data
INSERT INTO tracking_log VALUES 
(1,1,'2025-09-01 09:00:00',850,35000,-73.7781,40.6413,'In Flight'),
(2,2,'2025-09-02 10:00:00',820,34000,-118.409,33.9416,'In Flight'),
(3,3,'2025-09-03 15:00:00',900,36000,55.3644,25.2528,'In Flight'),
(4,4,'2025-09-04 23:00:00',880,35500,103.992,1.3644,'In Flight'),
(5,5,'2025-09-05 08:00:00',870,35000,8.5706,50.0333,'In Flight'),
(6,6,'2025-09-06 16:00:00',890,36000,51.5651,25.2736,'In Flight'),
(7,7,'2025-09-07 07:00:00',500,25000,77.1031,28.5562,'In Flight'),
(8,8,'2025-09-08 09:30:00',510,26000,72.8681,19.0896,'In Flight'),
(9,9,'2025-09-09 14:00:00',910,37000,-87.9048,41.9742,'In Flight'),
(10,10,'2025-09-10 11:00:00',860,35500,113.919,22.308,'In Flight');

-- Verify all tables
SELECT 'Database setup complete!' as Status;
SELECT COUNT(*) as Total_Aircraft FROM aircraft;
SELECT COUNT(*) as Total_Flights FROM flight;
SELECT COUNT(*) as Total_Maintenance FROM maintenance;
SELECT COUNT(*) as Total_Tracking_Logs FROM tracking_log;
SELECT COUNT(*) as Total_Airports FROM airport;
SELECT COUNT(*) as Total_Technicians FROM technician;

USE airplanedb;
SHOW TABLES;
SELECT COUNT(*) FROM aircraft;