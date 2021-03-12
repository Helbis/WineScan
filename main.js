function createCard(row) {
    const temp_card = document.getElementById("temp_card");
    const card = temp_card.content.firstElementChild;
    const here = document.getElementsByClassName("collectionsView")[0];

    const collection = document.querySelectorAll("[class=card]");
    const data = JSON.parse(localStorage[row]);

    // console.log(data.wine_name);

    // Create new card, but do not attach right away
    // Add new card
    const elem = card.cloneNode(true);

    // Change Photo
    elem.children[0].setAttribute("src", data.Photo);

    // Change middle info
    // Wine name
    elem.children[1].children[0].innerHTML = data.wine_name;
    elem.setAttribute("wine_name", data.wine_name);
    // Wine Year
    elem.children[1].children[1].innerHTML = data.wine_year;
    elem.setAttribute("wine_year", data.wine_year);
    // Wine Style
    elem.children[1].children[2].innerHTML = data.style;
    elem.setAttribute("wine_style", data.style);

    elem.setAttribute("wine_taste", data.wine_taste);
    elem.setAttribute("creation_date", data.creation_date);
    elem.setAttribute("deletion_date", data.deletion_date);

    // Add different button action
    elem.children[2].children[0].setAttribute("onclick", `activateDetails(${row})`);

    // Reset number of Bottles
    elem.children[2].children[1].innerHTML = 1;

    // Filter finished ones
    if (elem.getAttribute("deletion_date") !== "null") {
        elem.style.display = "none";
    }

    if (collection.length === 0) {
        // Attach element to collectionsView
        elem.setAttribute("rows", JSON.stringify([row]));
        here.appendChild(elem);
        console.log("Should occur once!!");
        return;
    }

    // Check every element in the collection
    //      compare with the new data
    for (let i=0; i<collection.length; i++) {
        if (collection.hasOwnProperty(i)) {
            // console.log(`${i}\n${collection[i].getAttribute("wine_name")} \n${data.wine_name} \n\t`, collection[i].getAttribute("wine_name") === data.wine_name);

            if (collection[i].getAttribute("wine_name") === data.wine_name) {
                // console.log("The same name");
                if (parseInt(collection[i].getAttribute("wine_year")) === data.wine_year) {
                    // The same name and year => must be the new bottle or drunk one
                    // console.log("The same year");
                    if (elem.style.display === collection[i].style.display) {
                        console.log(collection[i].getAttribute("wine_name"), collection[i].getAttribute("rows"));

                        // console.log(collection[i].getAttribute("rows") != null);

                        if (collection[i].getAttribute("rows") != null) {
                            // Already exists
                            let arr = JSON.parse(collection[i].getAttribute("rows"));
                            arr.push(row);
                            collection[i].setAttribute("rows", JSON.stringify(arr));

                            // Set the number of bottles
                            collection[i].children[2].children[1].innerHTML = arr.length;
                            return;

                        } else {
                            // First of its kind
                            collection[i].setAttribute("rows", JSON.stringify([row]));
                            collection[i].children[2].children[1].innerHTML = 1;
                            return;
                        }
                    }
                    break;
                } else {
                    // The same name, but different year
                    // Add new wine/year structure
                    // console.log("the same name different year");
                    break;
                }
            } else {
                // console.log("Different names");
                continue;
            }
        }
    }

    // Attach element to collectionsView
    here.appendChild(elem);
}


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
            // console.table(data);
            localStorage.clear();

            for (let row=0; row<data.length; row++) {
                // Store data in localStorage
                localStorage.setItem(row, JSON.stringify(data[row]));
            }

            for (let row=0; row<localStorage.length; row++) {
                createCard(row);
            }
        });
    }
};

loadData();
