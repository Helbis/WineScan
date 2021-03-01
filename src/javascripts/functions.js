/*== Event listeners ==*/
const stored = document.getElementById("stored");
let storedSwitch = false;
document.getElementById("stored").addEventListener("click", () => {
    if (storedSwitch) {
        stored.style.color = "#f00";
        storedSwitch = false;
    } else {
        stored.style.color = "#0f0";
        storedSwitch = true;
    }
});

const finished = document.getElementById("finished");
let finishedSwitch = false;
document.getElementById("finished").addEventListener("click", () => {
    if (finishedSwitch) {
        finished.style.color = "#f00";
        finishedSwitch = false;
    } else {
        finished.style.color = "#0f0";
        finishedSwitch = true;
    }
});

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

function activateDetails(row) {
    const activeElems = document.querySelectorAll('.detailsView.inactive');
    const card = activeElems[0];

    // console.log(activeElems[0]);

    activeElems.forEach(elm => {
        if (elm === null) {
            return;
        }

        elm.classList.remove('inactive');
        elm.classList.add('active');
    });

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

    if (!io) {
        return;
    }

    const socket = io();

    socket.emit('front2back', query);

    socket.on('back2front', (data) => {
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

function closeDetails() {
    const activeElems = document.querySelectorAll('.detailsView.active');

    activeElems.forEach(elm => {
        if (elm === null) {
            return;
        }
        elm.classList.remove('active');
        elm.classList.add('inactive');
    });
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
