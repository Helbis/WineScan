// BUG:
// Button jumps from right to left corners.
// It doesn't change it's model's attributes while doing so.
//
// The cause for that seems to be width atribute.

app.component('upButton', {
    name: "upButton",
    methods: {
        scrollUp() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    },

    template:`
    <button
        id="upButton"
        type="button"
        name="upButton"
        @click="scrollUp"
        >^
    </button>
    `
});
