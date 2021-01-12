<template>
    <collectionsView/>
    <detailsView/>
</template>

<script>
import collectionsView from './components/collectionsView.vue';
import detailsView from './components/detailsView.vue';

export default {
    name: 'App',
    components: {
        collectionsView,
        detailsView
    }
}
</script>
