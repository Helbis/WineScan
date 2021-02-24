function loadData() {
    const temp_card = document.getElementById("temp_card");
    const first = temp_card.content.firstElementChild;
    const here = document.getElementsByClassName("collectionsView")[0];

    for (let i = 0; i < 20; i++) {
        here.appendChild(first.cloneNode(true));
    }

    const socket = io();

    socket.emit('front2back', 'SELECT name FROM Style');

    socket.on('back2front', (msg) => {
        console.log('connected');
        console.table(msg);
    });
};

loadData();
