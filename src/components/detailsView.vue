<template>
    <div class="detailsView">
        <div class="details-top">
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
        </div>

        <div class="details-main">
            <div class="description">
                Description
            </div>

            <div class="invoices">
                Invoices
            </div>

            <p class="num_of_bottles">842</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detailsView'
}
</script>
