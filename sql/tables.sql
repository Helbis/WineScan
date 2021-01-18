CREATE TABLE IF NOT EXISTS Taste (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Variety (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Style (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Localization (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Volumes (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `volume` DECIMAL(5,3) NOT NULL
);

CREATE TABLE IF NOT EXISTS Suplier (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `phone_number` VARCHAR(20),
    `email` VARCHAR(200),
    `note` VARCHAR(2000)
);

CREATE TABLE IF NOT EXISTS User (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(256) NOT NULL,
    `email` VARCHAR(256),
    `creation_date` DATE NOT NULL,
    `password_hashed` VARCHAR(256) NOT NULL,
    `photo` VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Wine (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(5000),
    `id_taste` INT,
    `id_variety` INT,
    `id_style` INT NOT NULL,

    CONSTRAINT `wine_taste`
        FOREIGN KEY (`id_taste`) REFERENCES `Taste`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,

    CONSTRAINT `wine_variety`
        FOREIGN KEY (`id_variety`) REFERENCES `Variety`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,

    CONSTRAINT `wine_style`
        FOREIGN KEY (`id_style`) REFERENCES `Style`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS Wine_year (
    `id` INT NOT NULL PRIMARY KEY,
    `bottling_year` YEAR NOT NULL,
    `rating` INT,
    `photo` VARCHAR(300),
    `id_wine` INT NOT NULL,

    CONSTRAINT `wine_year__wine`
        FOREIGN KEY (`id_wine`) REFERENCES `Wine`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS Invoice (
    `id` INT NOT NULL PRIMARY KEY,
    `creation_date` DATE NOT NULL,
    `order_number` VARCHAR(20),
    `total_price` INT,
    `note` VARCHAR(500),
    `id_suplier` INT NOT NULL,

    CONSTRAINT `invoice_suplier`
        FOREIGN KEY (`id_suplier`) REFERENCES `Suplier`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE IF NOT EXISTS Bottle (
    `id` INT NOT NULL PRIMARY KEY,
    `price` DECIMAL(7, 2) NOT NULL,
    `id_volume` INT NOT NULL,
    `friends` VARCHAR(200),
    `creation_date` DATE NOT NULL,
    `deletion_date` DATE,
    `scanned_code` INT,
    `id_localization` INT,
    `id_invoice` INT,
    `id_year` INT NOT NULL,

    CONSTRAINT `bottle_volume`
        FOREIGN KEY (`id_volume`) REFERENCES `Volumes`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,

    CONSTRAINT `bottle_Localization`
        FOREIGN KEY (`id_localization`) REFERENCES `Localization`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,

    CONSTRAINT `bottle_invoice`
        FOREIGN KEY (`id_invoice`) REFERENCES `Invoice`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,

    CONSTRAINT `bottle_wine_year`
        FOREIGN KEY (`id_year`) REFERENCES `Wine_year`(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);
