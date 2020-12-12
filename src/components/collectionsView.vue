<template>
    <div class="collectionsView">
        <searchBar></searchBar>

        <!-- There will be many cards, make a list!!! -->
        <card></card>
    </div>
</template>

<script>
import searchBar from './searchBar.vue'
import card from './card.vue'

export default {
    name: 'collectionsView',
    components:{
        searchBar,
        card
    }
}
</script>
