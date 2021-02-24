SELECT
    Wine.name AS "wine_name",
    Wine_year.bottling_year AS "wine_year",
    Style.name AS "style",
    Wine.description AS "Description",
    Invoice.note AS "Invoice"
FROM
    Invoice INNER JOIN
    Bottle ON Bottle.id_invoice = Invoice.id INNER JOIN
    Wine_year ON Bottle.id_year = Wine_year.id INNER JOIN
    Wine ON Wine_year.id_wine = Wine.id INNER JOIN
    Style ON Wine.id_style = Style.id;
