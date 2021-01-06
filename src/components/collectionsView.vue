<template>
    <div class="collectionsView">
        <searchBar></searchBar>

        <card v-for="n in 40"></card>

        <upButton></upButton>
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
