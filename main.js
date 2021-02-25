function loadData() {
    const temp_card = document.getElementById("temp_card");
    const card = temp_card.content.firstElementChild;
    const here = document.getElementsByClassName("collectionsView")[0];

    // console.log(temp_card);
    // console.log(card.children[2]);
    // console.log(here);

    const socket = io();

    if (!io) {
        // Empty template
        for (let i = 0; i < 20; i++) {
            here.appendChild(card.cloneNode(true));
        }
        return;
    } else {
        const query = `
        SELECT
            Wine.name AS "wine_name",
            Wine_year.bottling_year AS "wine_year",
            Wine_year.photo AS "Photo",
            Style.name AS "style",
            Bottle.scanned_code AS "scanned_code",
            Wine.description AS "Description",
            Invoice.note AS "Invoice"
        FROM
            Invoice INNER JOIN
            Bottle ON Bottle.id_invoice = Invoice.id INNER JOIN
            Wine_year ON Bottle.id_year = Wine_year.id INNER JOIN
            Wine ON Wine_year.id_wine = Wine.id INNER JOIN
            Style ON Wine.id_style = Style.id
        ORDER BY Wine_year.bottling_year;`;

        socket.emit('front2back', query);

        socket.on('back2front', (data) => {
            // console.table(data);
            // console.log(data);

            for (let row in data) {
                if (data.hasOwnProperty(row)) {
                    // console.log(data[row]);
                    const elem = card.cloneNode(true);

                    // Change Photo
                    elem.children[0].setAttribute("src", data[row].Photo);

                    // Change middle info
                    // Wine name
                    elem.children[1].children[0].innerHTML = data[row].wine_name;
                    // Wine Year
                    elem.children[1].children[1].innerHTML = data[row].wine_year;
                    // Wine Style
                    elem.children[1].children[2].innerHTML = data[row].style;

                    // Add different button action
                    elem.children[2].children[0].setAttribute("onclick", `activateDetails(${row})`);

                    // Attach element to collectionsView
                    here.appendChild(elem);
                }
            }
        });
    }
};

loadData();
