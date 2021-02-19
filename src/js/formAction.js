function addOption(name, datalist) {
    console.log(`name = ${name}`);

    const elem = document.getElementById(datalist);
    const opt = document.createElement("option");

    opt.value = name;
    opt.innerHTML = name;

    elem.appendChild(opt);
}

function initDatalist() {
    // Get options for datalists
    // const wine_name;
    // const wine_year;
    // const friends;
    // const bottle_code;
    // const localization;
    // const order number;
    // const supplier_name;
    // const supplier_phone;
    // const supplier_email;
    const variety = {
        1 : "Abouriou",
        2 : "Abrustine",
        3 : "Absinthe",
        4 : "Acadie Blanc",
        5 : "Acolon",
        6 : "Agave Spirit",
        7 : "Agiorgitiko",
        8 : "Aglianico"
    }

    for (let key in variety) {
        if (variety.hasOwnProperty(key)) {
            addOption(variety[key], "variety_list");
        }
    }
};


initDatalist();
