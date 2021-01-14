import './collectionsView.js';
import './detailsView.js';

app.component('App', {
    name: 'App',
    components: {
        collectionsView,
        detailsView
    },

    template:
    /*html*/
    `
        <div>
            <collectionsView></collectionsView>
            <detailsView></detailsView>
        </div>
    `
});
