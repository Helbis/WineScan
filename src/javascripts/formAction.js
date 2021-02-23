function addOption(name, datalist) {
    const elem = document.getElementById(datalist);
    const opt = document.createElement("option");

    opt.value = name;
    opt.innerHTML = name;

    elem.appendChild(opt);
}

function initDatalist() {
    // Get options for datalists
    const wine_name;
    const wine_year;
    const friends;
    const bottle_code;
    const localization;
    const order_number;
    const supplier_name;
    const supplier_phone;
    const supplier_email;
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

    for (let key in wine_name) {
        if (wine_name.hasOwnProperty(key)) {
            addOption(wine_name[key], "wine_name_list");
        }
    }

    for (let key in wine_year) {
        if (wine_year.hasOwnProperty(key)) {
            addOption(wine_year[key], "wine_year_list");
        }
    }

    for (let key in friends) {
        if (friends.hasOwnProperty(key)) {
            addOption(friends[key], "friends_list");
        }
    }

    for (let key in bottle_code) {
        if (bottle_code.hasOwnProperty(key)) {
            addOption(bottle_code[key], "bottle_code_list");
        }
    }

    for (let key in localization) {
        if (localization.hasOwnProperty(key)) {
            addOption(localization[key], "localization_list");
        }
    }

    for (let key in order_number) {
        if (order_number.hasOwnProperty(key)) {
            addOption(order_number[key], "order_number_list");
        }
    }

    for (let key in supplier_name) {
        if (supplier_name.hasOwnProperty(key)) {
            addOption(supplier_name[key], "supplier_name_list");
        }
    }

    for (let key in supplier_phone) {
        if (supplier_phone.hasOwnProperty(key)) {
            addOption(supplier_phone[key], "supplier_phone_list");
        }
    }

    for (let key in supplier_email) {
        if (supplier_email.hasOwnProperty(key)) {
            addOption(supplier_email[key], "supplier_email_list");
        }
    }

    for (let key in variety) {
        if (variety.hasOwnProperty(key)) {
            addOption(variety[key], "variety_list");
        }
    }
};


initDatalist();
