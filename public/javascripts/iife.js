// Make multiple cards
// IIFE
(function() {
    'use strict';

    const temp_card = document.getElementById("temp_card");
    const first = temp_card.content.firstElementChild;
    const here = document.getElementsByClassName("collectionsView")[0];

    for (let i = 0; i < 50; i++) {
        here.appendChild(first.cloneNode(true));
    }
}());
