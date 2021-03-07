/*== Event listeners ==*/
const stored = document.getElementById("stored");
const finished = document.getElementById("finished");
let storedSwitch = true;
let finishedSwitch = false;
const tasteList = {
    1: "Dry",
    2: "Medium dry",
    3: "Medium Sweet",
    4: "Sweet"
}
const styleList = {
    1: "Red",
    2: "White",
    3: "Sparkling",
    4: "Rosé",
    5: "Orange",
    6: "Dessert",
    7: "Dessert/Fortified",
    8: "Dessert/Ice",
    9: "Dessert/Aromatized",
    10: "Dessert/Fruit",
    11: "Dessert/Noble rot",
    12: "Dessert/Straw",
    13: "Other",
    14: "Other/Table",
    15: "Other/Natural",
    16: "Other/Biodynamic",
    17: "Other/Organic",
    18: "Other/Kosher"
}


stored.addEventListener("click", () => {
    if (storedSwitch) {
        return;
    } else {
        setState(stored, true);
        setState(finished, false);
        storedSwitch = true;
        finishedSwitch = false;
    }
});

finished.addEventListener("click", () => {
    if (finishedSwitch) {
        return;
    } else {
        setState(finished, true);
        setState(stored, false);
        storedSwitch = false;
        finishedSwitch = true;
    }
});

setState(stored, true);
setState(finished, false);
/*==============================*/

function setState(what, state) {
    if (state) {
        what.style.background = "var(--color-accent)";
        what.style.color = "whitesmoke";
    } else {
        what.style.background = "lightgrey";
        what.style.color = "black";
    }
}

/*== FILTERING ==*/
// I will filter only by setting appropiate elements to invisible
function filterStyle(styleID) {
    // console.log(styleID);
    const collection = document.querySelectorAll("[class=card]");
    console.log(collection);

    for (let i=0; i < collection.length; i++) {
        // console.log(collection[i]);
        for (let stl in styleList) {
            if (styleList.hasOwnProperty(stl)) {
                console.log("works");
                if (collection[i].wine_style == stl) {
                    console.log(`${collection[i]} style : ${stl}`);
                }
            }
        }
        if (styleID === 0) {
            // Disable filtering of style

        } else {
        }
    }
}

function filterTaste(tasteID) {
    // console.log(tasteID);
    const TASTE_COUNT = 4;

    if (tasteID === 0) {
        // Disable filtering of taste

    } else {
        for (let i = 1; i <= TASTE_COUNT; i++) {

        }
    }
}
/*==============================*/

function removeBottle(code) {
    alert(code);
}

function addOption(name, datalist) {
    if (name === undefined) { return; }
    if (datalist === undefined) { return; }

    const elem = document.getElementById(datalist);
    const opt = document.createElement("option");

    opt.value = name;
    opt.innerHTML = name;

    elem.appendChild(opt);
}

function populateWithData() {
    if (window.socketIO_failed) {
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

        const socket = io();

        socket.emit('front2back', query);

        socket.on('back2front', data => {
            // console.table(data);
            // console.log(data);

            if (data.hasOwnProperty(row)) {
                // console.log(data[row]);
                const elem = card.cloneNode(true);

                // Change Photo
                card.children[0].children[0].setAttribute("src", data[row].Photo);

                // Change middle info
                // Wine name
                card.children[0].children[1].children[0].innerHTML = data[row].wine_name;
                // Wine Year
                card.children[0].children[1].children[1].innerHTML = data[row].wine_year;
                // Wine Style
                card.children[0].children[1].children[2].innerHTML = data[row].style;
                // Removing form
                card.children[0].children[2].children[3].setAttribute("onclick", `removeBottle(${data[row].scanned_code})`);

                // Change description
                card.children[2].children[0].children[1].innerHTML = data[row].Description;

                // Change invoice
                card.children[2].children[1].children[1].innerHTML = data[row].Invoice;
            }
        });
    }
}

function activateDetails(row) {
    const card = document.querySelectorAll('.detailsView.inactive')[0];

    card.classList.remove('inactive');
    card.classList.add('active');

    populateWithData();
}

function closeDetails() {
    const card = document.querySelectorAll('.detailsView.active')[0];

    if (card === undefined) {
        return;
    }

    card.classList.remove('active');
    card.classList.add('inactive');
}

function scrollUp() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("topBar").style.top = "0";
    } else {
        document.getElementById("topBar").style.top = "-1000px";
    }
    prevScrollpos = currentScrollPos;

    // UpButton
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("upButton").style.display = "block";
    } else {
        document.getElementById("upButton").style.display = "none";
    }

    closeDetails();
}
