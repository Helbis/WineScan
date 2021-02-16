function activateDetails() {
    const activeElems = document.querySelectorAll('.detailsView.inactive');

    activeElems.forEach(elm => {
        if (elm == null) {
            return;
        }

        elm.classList.remove('inactive');
        elm.classList.add('active');
    });
}

function closeDetails() {
    const activeElems = document.querySelectorAll('.detailsView.active');

    activeElems.forEach(elm => {
        if (elm == null) {
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
        document.getElementById("searchBar").style.top = "0";
        // document.getElementById("moreBtn").style.top = "0";
    } else {
        document.getElementById("searchBar").style.top = "-100px";
        // document.getElementById("moreBtn").style.top = "-100px";
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
