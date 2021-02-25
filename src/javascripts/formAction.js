const socket = io();


function addOption(name, datalist) {
    if (name === undefined) { return; }
    if (datalist === undefined) { return; }

    const elem = document.getElementById(datalist);
    const opt = document.createElement("option");

    opt.value = name;
    opt.innerHTML = name;

    elem.appendChild(opt);
}

function initDatalist() {
    // Get options for datalists
    socket.emit('front2back', 'SELECT name AS "wine_name" FROM Wine;');
    socket.on('back2front', data => {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                addOption(data[key].wine_name, "wine_name_list");
            }
        }
    });

    socket.emit('front2back', 'SELECT name AS "variety" FROM Variety;');
    socket.on('back2front', data => {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                addOption(data[key].variety, "variety_list");
            }
        }
    });

    socket.emit('front2back', 'SELECT name AS "Localization" FROM Localization;');
    socket.on('back2front', data => {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                addOption(data[key].Localization, "localization_list");
            }
        }
    });
};


initDatalist();


function submitForm() {
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());

    console.log(data);

    // You can add only
    //  wine,
    //  wine + wine_year,
    //  wine + wine_year + bottle

    console.log(data.volumes_options);
    socket.emit('submition', '😄');

    // Check if wine name and wine year were given
    // Then the bottle definition will be checked
    //  * Add bottle to an existing wine_year

    // Check if complete wine definition was given
    // Check if bottle definition was given
    // * Create new wine, wine_year and bottle
}
