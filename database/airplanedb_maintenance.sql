-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: airplanedb
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maintenance` (
  `Maintenance_ID` int NOT NULL,
  `Aircraft_ID` int DEFAULT NULL,
  `Tech_ID` int DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Remark` varchar(100) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Maintenance_ID`),
  KEY `Aircraft_ID` (`Aircraft_ID`),
  KEY `Tech_ID` (`Tech_ID`),
  CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`Aircraft_ID`) REFERENCES `aircraft` (`Aircraft_ID`),
  CONSTRAINT `maintenance_ibfk_2` FOREIGN KEY (`Tech_ID`) REFERENCES `technician` (`Tech_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
INSERT INTO `maintenance` VALUES (1,1,1,'2025-08-01','Engine Check','No issues found','Completed'),(2,2,2,'2025-08-03','Avionics Update','Firmware upgraded','Completed'),(3,3,3,'2025-08-05','Airframe Inspection','Minor cracks repaired','Completed'),(4,4,4,'2025-08-08','Hydraulics Check','Hydraulic fluid replaced','Completed'),(5,5,5,'2025-08-10','Electrical Systems','Battery replaced','Completed'),(6,6,6,'2025-08-12','Routine Maintenance','All systems functional','Completed'),(7,7,7,'2025-08-14','Safety Inspection','Passed all safety checks','Completed'),(8,8,8,'2025-08-16','Flight Systems Test','Autopilot adjusted','Completed'),(9,9,9,'2025-08-18','Quality Check','Approved for flight','Completed'),(10,10,10,'2025-08-20','Fuel Systems Check','Fuel pump replaced','Completed');
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-02 17:22:26
