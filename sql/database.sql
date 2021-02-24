-- Create database and tables
-- CREATE DATABASE IF NOT EXISTS WineScan;
-- USE WineScan;

-- source /home/helbis/Documents/TCS/WineScan/sql/tables.sql;

-- Inserts
-- Taste
-- source /home/helbis/Documents/TCS/WineScan/sql/taste.sql;

-- Variety
-- source /home/helbis/Documents/TCS/WineScan/sql/variety.sql;

-- Style
-- source /home/helbis/Documents/TCS/WineScan/sql/style.sql;

-- Localization
-- source /home/helbis/Documents/TCS/WineScan/sql/localization.sql;

-- Volumes
-- source /home/helbis/Documents/TCS/WineScan/sql/volumes.sql;

-- Suplier
-- source /home/helbis/Documents/TCS/WineScan/sql/supplier.sql;

-- User
-- Does not exist, it's not needed
-- source /home/helbis/Documents/TCS/WineScan/sql/user.sql;

-- Wine
-- source /home/helbis/Documents/TCS/WineScan/sql/wine.sql;

-- Wine_year
-- source /home/helbis/Documents/TCS/WineScan/sql/wine_year.sql;

-- Invoice
-- source /home/helbis/Documents/TCS/WineScan/sql/invoice.sql;

-- Bottle
-- source /home/helbis/Documents/TCS/WineScan/sql/bottle.sql;

-- Test for proper creation of database and inserted data
-- SELECT * FROM Taste;
-- SELECT * FROM Variety;
-- SELECT * FROM Style;
-- SELECT * FROM Localization;
-- SELECT * FROM Volumes;
-- SELECT * FROM Suplier;
-- SELECT * FROM User;
-- SELECT * FROM Wine;
-- SELECT * FROM Wine_year;
-- SELECT * FROM Invoice;
-- SELECT * FROM Bottle;


SELECT Bottle.id, Bottle.price AS "Price", Volumes.name AS "Volume", Bottle.scanned_code AS "Code", Localization.name AS "City", Invoice.note
FROM
    Bottle
    INNER JOIN Volumes ON
        Volumes.id = Bottle.id_volume
    INNER JOIN Localization ON
        Localization.id = Bottle.id_localization
    INNER JOIN Invoice ON
        Invoice.id = Bottle.id_invoice;
