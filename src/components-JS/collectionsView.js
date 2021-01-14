app.component('collectionsView', {
    name: 'collectionsView',
    components:{
        searchBar,
        card,
        upButton
    },

    template:`
    <div class="collectionsView">
        <searchBar></searchBar>

        <card v-for="n in 30"></card>

        <upButton></upButton>
    </div>
    `
});
