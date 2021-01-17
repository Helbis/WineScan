CREATE TABLE `Bottle` (
  `ID` INT,
  `Price` DECIMAL(7, 2),
  `ID_Volume` INT,
  `Friends` VARCHAR(200),
  `Creation_Date` DATE,
  `Deletion_Date` DATE,
  `Scanned_code` INT,
  `ID_Localization` INT,
  `ID_Invoice` INT,
  `ID_year` INT,
  KEY `NN, PK` (`ID`),
  KEY `NN` (`Price`, `Creation_Date`),
  KEY `NN, FK` (`ID_Volume`, `ID_year`)
);

CREATE TABLE `Invoice` (
  `ID` INT,
  `date` DATE,
  `Number` VARCHAR(20),
  `Total_price` INT,
  `note` VARCHAR(500),
  `ID_suplier` INT,
  KEY `NN, PK` (`ID`),
  KEY `NN` (`date`),
  KEY `NN, FK` (`ID_suplier`)
);

CREATE TABLE `Taste` (
  `ID` INT,
  `Name` VARCHAR(100),
  KEY `NN, PK` (`ID`),
  KEY `NN` (`Name`)
);

CREATE TABLE `Wine_year` (
  `ID` INT,
  `year` YEAR,
  `Rating` INT,
  `photo` VARCHAR(100),
  `ID_wine` INT,
  KEY `NN, PK` (`ID`),
  KEY `NN` (`year`),
  KEY `NN, FK` (`ID_wine`)
);

CREATE TABLE `Localization` (
  `ID` INT,
  `Name` VARCHAR(100),
  KEY `NN, PK` (`ID`),
  KEY `NN` (`Name`)
);

CREATE TABLE `Wine` (
  `ID` INT,
  `Name` VARCHAR(100),
  `Description` VARCHAR(5000),
  `ID_Taste` INT,
  `ID_Variety` INT,
  `ID_Style` INT,
  KEY `NN, PK` (`ID`),
  KEY `NN` (`Name`),
  KEY `NN, FK` (`ID_Style`)
);

CREATE TABLE `Suplier` (
  `ID` INT,
  `Name` VARCHAR(200),
  `phone_number` VARCHAR(20),
  `email` VARCHAR(200),
  `note` VARCHAR(2000),
  KEY `NN, PK` (`ID`),
  KEY `NN, U` (`Name`)
);

CREATE TABLE `Volumes` (
  `ID` INT,
  `NAME` VARCHAR(200),
  `VOLUME` DECIMAL(5,3),
  KEY `NN, PK` (`ID`),
  KEY `NN` (`NAME`, `VOLUME`)
);

CREATE TABLE `Style` (
  `ID` INT,
  `Name` VARCHAR(100),
  KEY `NN, PK` (`ID`),
  KEY `NN` (`Name`)
);

CREATE TABLE `User` (
  `ID` INT,
  `Name` VARCHAR(256),
  `email` VARCHAR(256),
  `Creation_Date` Date,
  `password_hashed` VARCHAR(256),
  `photo` VARCHAR(100),
  KEY `NN, PK` (`ID`),
  KEY `NN` (`Name`, `Creation_Date`, `password_hashed`)
);

CREATE TABLE `Variety` (
  `ID` INT,
  `Name` VARCHAR(100),
  KEY `NN, PK` (`ID`),
  KEY `NN` (`Name`)
);
