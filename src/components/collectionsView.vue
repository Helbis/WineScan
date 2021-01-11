<template>
    <div class="collectionsView">
        <searchBar></searchBar>

        <card v-for="n in 30"></card>

        <upButton></upButton>
    </div>
</template>

<script>
import searchBar from './searchBar.vue';
import card from './card.vue';
import upButton from './upButton.vue';
console.log("collectionsView.vue");
export default {
    name: 'collectionsView',
    components:{
        searchBar,
        card,
        upButton
    }
}
</script>
