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

// NOTE: Not a clean solution but works for now
function changeFoldStateDescripton() {
    if (this.stateDesc_text === 'unfold') {
        this.stateDesc_text = 'fold';
    } else if (this.stateDesc_text === 'fold') {
        this.stateDesc_text = 'unfold';
    }
}

function changeFoldStateInvoices() {
    if (this.stateInv_text === 'unfold') {
        this.stateInv_text = 'fold';
    } else if (this.stateInv_text === 'fold') {
        this.stateInv_text = 'unfold';
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
        // console.log("block");
        document.getElementById("upButton").style.display = "block";
    } else {
        // console.log("None");
        document.getElementById("upButton").style.display = "none";
    }
}
