function loadData() {
    const temp_card = document.getElementById("temp_card");
    const card = temp_card.content.firstElementChild;
    const here = document.getElementsByClassName("collectionsView")[0];

    if (window.socketIO_failed) {
        // Empty template
        for (let i = 0; i < 20; i++) {
            here.appendChild(card.cloneNode(true));
        }
        return;

    } else {
        const socket = io();

        const query = `
        SELECT DISTINCT
            Wine.name AS "wine_name",
            Taste.name AS "wine_taste",
            Wine_year.bottling_year AS "wine_year",
            Wine_year.photo AS "Photo",
            Style.name AS "style",
            Bottle.scanned_code AS "scanned_code",
            Bottle.creation_date AS "creation_date",
            Bottle.deletion_date AS "deletion_date",
            Wine.description AS "Description",
            Invoice.note AS "Invoice"
        FROM
            Invoice INNER JOIN
            Bottle ON Bottle.id_invoice = Invoice.id INNER JOIN
            Wine_year ON Bottle.id_year = Wine_year.id INNER JOIN
            Wine ON Wine_year.id_wine = Wine.id INNER JOIN
            Taste ON Wine.id_taste = Taste.id INNER JOIN
            Style ON Wine.id_style = Style.id
        ORDER BY Wine_year.bottling_year;`;

        socket.emit('front2back', query);

        socket.on('back2front', (data) => {
            console.table(data);
            localStorage.clear();

            let obj = {
                wNames: [],
                years: [],
                count: []
            };

            let elem;

            for (let row=0; row<data.length; row++) {
                // Store data in localStorage
                localStorage.setItem(row, JSON.stringify(data[row]));

                // Check year

                // Check name

                // Filter
                if (!obj.wNames.includes(data[row].wine_name)) {
                    obj.wNames.push(data[row].wine_name);

                    obj.count.push(1);

                    // Testing
                    obj.years.push(data[row].wine_year);

                    // Add new card
                    elem = card.cloneNode(true);

                    // Change Photo
                    elem.children[0].setAttribute("src", data[row].Photo);

                    // Change middle info
                    // Wine name
                    elem.children[1].children[0].innerHTML = data[row].wine_name;
                    elem.setAttribute("wine_name", data[row].wine_name);
                    // Wine Year
                    elem.children[1].children[1].innerHTML = data[row].wine_year;
                    elem.setAttribute("wine_year", data[row].wine_year);
                    // Wine Style
                    elem.children[1].children[2].innerHTML = data[row].style;
                    elem.setAttribute("wine_style", data[row].style);

                    elem.setAttribute("wine_taste", data[row].wine_taste);
                    elem.setAttribute("creation_date", data[row].creation_date);
                    elem.setAttribute("deletion_date", data[row].deletion_date);

                    // Add different button action
                    elem.children[2].children[0].setAttribute("onclick", `activateDetails(${row})`);

                    // Attach element to collectionsView
                    here.appendChild(elem);

                    // Filter finished ones
                    if (elem.getAttribute("deletion_date") !== "null") {
                        elem.style.display = "none";
                    }

                } else {
                    obj.count[obj.count.length - 1] += 1;
                }
            }
        });
    }
};

loadData();
