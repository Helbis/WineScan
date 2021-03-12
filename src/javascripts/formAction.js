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
    if (window.socketIO_failed) {
        return;
    } else {
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
                if (data.hasOwnProperty(key)) {
                    addOption(data[key].Localization, "localization_list");
                }
            }
        });
    }
};


function submitForm() {
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());

    if (window.socketIO_failed) {
        return;
    } else {
        const socket = io();

        // console.log(data);

        // Check if wine_name was given
        if (data.wine_name.length === 0 || data.variety.length === 0) {
            alert("Please check wine data");
            return; //Without a proper wine name there is no need to send the data
        } else {
            // Data has wine_name and variety provided
            // Check if year was given
            if (data.wine_year.length !== 0) {
                // User is trying to send both wine and year
                if (1901 < parseInt(data.wine_year) && parseInt(data.wine_year) < 2155) {
                    // Year is proper
                    socket.emit('submition', data);
                    // console.log("Sending wine and year");
                } else {
                    // Year is wrong
                    alert("Year of the bottle is wrong\nshould be between 1901 and 2155");
                    return;
                }
            } else {
                // Year was not provided, send only wine data
                // console.log("Sending data for wine only");
                socket.emit('submition', data);
            }
        }
    }
}


initDatalist();
