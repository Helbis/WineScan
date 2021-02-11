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

// Side panel
function openNav() {
    document.getElementById("mySidenav").style.width = "20rem";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Website for symbols
// https://www.htmlsymbols.xyz/search?q=dot
function changeFoldState(id) {
    const unFold = "unfold";
    const fold = "fold";

    const elm = document.getElementById(id);

    if (elm.innerText == fold) {
        elm.innerText = unFold;
    } else if (elm.innerText == unFold) {
        elm.innerText = fold;
    }
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
        document.getElementById("moreBtn").style.top = "0";
    } else {
        document.getElementById("searchBar").style.top = "-100px";
        document.getElementById("moreBtn").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;

    // UpButton
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("upButton").style.display = "block";
    } else {
        document.getElementById("upButton").style.display = "none";
    }

    // Close detailsView & sideNav
    closeNav();
    closeDetails();
}
