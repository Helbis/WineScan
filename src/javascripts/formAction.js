function addOption(name, datalist) {
    if (name === undefined) { return; }

    const elem = document.getElementById(datalist);
    const opt = document.createElement("option");

    opt.value = name;
    opt.innerHTML = name;

    elem.appendChild(opt);
}

function initDatalist() {
    const socket = io();

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
            if (variety.hasOwnProperty(key)) {
                addOption(variety[key], "variety_list");
            }
        }
    });
};


initDatalist();
