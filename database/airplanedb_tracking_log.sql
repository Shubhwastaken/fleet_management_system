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
-- Table structure for table `tracking_log`
--

DROP TABLE IF EXISTS `tracking_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracking_log` (
  `Tracking_ID` int NOT NULL,
  `Aircraft_ID` int DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `Speed` int DEFAULT NULL,
  `Altitude` int DEFAULT NULL,
  `Longitude` float DEFAULT NULL,
  `Latitude` float DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Tracking_ID`),
  KEY `Aircraft_ID` (`Aircraft_ID`),
  CONSTRAINT `tracking_log_ibfk_1` FOREIGN KEY (`Aircraft_ID`) REFERENCES `aircraft` (`Aircraft_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracking_log`
--

LOCK TABLES `tracking_log` WRITE;
/*!40000 ALTER TABLE `tracking_log` DISABLE KEYS */;
INSERT INTO `tracking_log` VALUES (1,1,'2025-09-01 09:00:00',850,35000,-73.7781,40.6413,'In Flight'),(2,2,'2025-09-02 10:00:00',820,34000,-118.409,33.9416,'In Flight'),(3,3,'2025-09-03 15:00:00',900,36000,55.3644,25.2528,'In Flight'),(4,4,'2025-09-04 23:00:00',880,35500,103.992,1.3644,'In Flight'),(5,5,'2025-09-05 08:00:00',870,35000,8.5706,50.0333,'In Flight'),(6,6,'2025-09-06 16:00:00',890,36000,51.5651,25.2736,'In Flight'),(7,7,'2025-09-07 07:00:00',500,25000,77.1031,28.5562,'In Flight'),(8,8,'2025-09-08 09:30:00',510,26000,72.8681,19.0896,'In Flight'),(9,9,'2025-09-09 14:00:00',910,37000,-87.9048,41.9742,'In Flight'),(10,10,'2025-09-10 11:00:00',860,35500,113.919,22.308,'In Flight');
/*!40000 ALTER TABLE `tracking_log` ENABLE KEYS */;
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
