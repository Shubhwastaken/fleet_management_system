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
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight` (
  `Flight_ID` int NOT NULL,
  `Aircraft_ID` int DEFAULT NULL,
  `Origin` varchar(50) DEFAULT NULL,
  `Destination` varchar(50) DEFAULT NULL,
  `Departure_Time` datetime DEFAULT NULL,
  `Arrival_Time` datetime DEFAULT NULL,
  `Attribute` varchar(50) DEFAULT NULL,
  `Origin_Airport_ID` int DEFAULT NULL,
  `Destination_Airport_ID` int DEFAULT NULL,
  PRIMARY KEY (`Flight_ID`),
  KEY `Aircraft_ID` (`Aircraft_ID`),
  KEY `fk_flight_origin` (`Origin_Airport_ID`),
  KEY `fk_flight_dest` (`Destination_Airport_ID`),
  CONSTRAINT `fk_flight_dest` FOREIGN KEY (`Destination_Airport_ID`) REFERENCES `airport` (`Airport_ID`),
  CONSTRAINT `fk_flight_origin` FOREIGN KEY (`Origin_Airport_ID`) REFERENCES `airport` (`Airport_ID`),
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`Aircraft_ID`) REFERENCES `aircraft` (`Aircraft_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
INSERT INTO `flight` VALUES (1,1,'New York','Los Angeles','2025-09-01 08:30:00','2025-09-01 11:30:00','Domestic',NULL,NULL),(2,2,'Los Angeles','Chicago','2025-09-02 09:15:00','2025-09-02 13:00:00','Domestic',NULL,NULL),(3,3,'Dubai','Singapore','2025-09-03 14:00:00','2025-09-03 20:00:00','International',NULL,NULL),(4,4,'Singapore','Frankfurt','2025-09-04 22:00:00','2025-09-05 06:00:00','International',NULL,NULL),(5,5,'Frankfurt','Doha','2025-09-05 07:30:00','2025-09-05 12:00:00','International',NULL,NULL),(6,6,'Doha','New York','2025-09-06 15:00:00','2025-09-06 22:30:00','International',NULL,NULL),(7,7,'Delhi','Mumbai','2025-09-07 06:45:00','2025-09-07 08:15:00','Domestic',NULL,NULL),(8,8,'Mumbai','Dubai','2025-09-08 09:00:00','2025-09-08 11:30:00','International',NULL,NULL),(9,9,'Chicago','Hong Kong','2025-09-09 13:00:00','2025-09-10 08:00:00','International',NULL,NULL),(10,10,'Hong Kong','Singapore','2025-09-10 10:00:00','2025-09-10 13:30:00','International',NULL,NULL);
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
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
