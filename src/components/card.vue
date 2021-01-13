<template>
    <div class="card">
        <img
            class="left_of_card"
            src="./../../photos/blanc_big_474x774.jpg"
            alt="wine"
            loading="lazy">

        <div class="middle_of_card">
            <p class="wine_name">name</p>
            <p class="wine_year">year</p>
            <p class="wine_style">style</p>
        </div>

        <div class="right_of_card">
            <button
                type="button"
                name="detailed_view"
                @click="activateDetails">
                    More
            </button>
            <p class="num_of_bottles">842</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card',

    methods:{
        activateDetails(){
            const activeElems = document.querySelectorAll('.detailsView.inactive');
            activeElems.forEach(elm => {
                if (elm == null) { return; }
                elm.classList.remove('inactive');
                elm.classList.add('active');
            });
        }
    }
}
</script>
