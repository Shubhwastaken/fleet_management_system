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
-- Table structure for table `aircraft`
--

DROP TABLE IF EXISTS `aircraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircraft` (
  `Aircraft_ID` int NOT NULL,
  `Model` varchar(50) DEFAULT NULL,
  `Capacity` int DEFAULT NULL,
  `Manufacture_Date` date DEFAULT NULL,
  `Airline` varchar(50) DEFAULT NULL,
  `Last_Known_Loc` varchar(100) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Last_Known_Loc_ID` int DEFAULT NULL,
  PRIMARY KEY (`Aircraft_ID`),
  KEY `fk_aircraft_location` (`Last_Known_Loc_ID`),
  CONSTRAINT `fk_aircraft_location` FOREIGN KEY (`Last_Known_Loc_ID`) REFERENCES `airport` (`Airport_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
INSERT INTO `aircraft` VALUES (1,'Boeing 737',180,'2015-06-12','Delta Airlines','New York','Active',NULL),(2,'Airbus A320',160,'2017-03-22','American Airlines','Los Angeles','Active',NULL),(3,'Boeing 777',396,'2012-11-05','Emirates','Dubai','Maintenance',NULL),(4,'Airbus A380',500,'2019-08-17','Singapore Airlines','Singapore','Active',NULL),(5,'Boeing 747',416,'2010-02-13','Lufthansa','Frankfurt','Inactive',NULL),(6,'Boeing 787',242,'2020-05-25','Qatar Airways','Doha','Active',NULL),(7,'Bombardier Q400',78,'2016-07-19','IndiGo','Delhi','Active',NULL),(8,'ATR 72',74,'2014-12-01','SpiceJet','Mumbai','Maintenance',NULL),(9,'Boeing 737 MAX',200,'2021-01-10','United Airlines','Chicago','Active',NULL),(10,'Airbus A350',325,'2018-09-15','Cathay Pacific','Hong Kong','Active',NULL);
/*!40000 ALTER TABLE `aircraft` ENABLE KEYS */;
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
