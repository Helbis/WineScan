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

// Website for symbols
// https://www.htmlsymbols.xyz/search?q=dot
function changeFoldState(id) {
    const upArrow = "\uD83E\uDC81";
    const downArrow = "\uD83E\uDC83";

    const elm = document.getElementById(id);

    if (elm.innerText == upArrow) {
        elm.innerText = downArrow;
    } else if (elm.innerText == downArrow) {
        elm.innerText = upArrow;
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
    } else {
        document.getElementById("searchBar").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;

    // UpButton
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("upButton").style.display = "block";
    } else {
        document.getElementById("upButton").style.display = "none";
    }
}
