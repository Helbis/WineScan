<template>
    <!-- NOTE: probably a good idea would be to change that from divs to article and sections -->
    <div class="detailsView">
        <div class="details-top">
            <img
                class="left_of_card"
                src="./../../photos/blanc_big_474x774.jpg"
                alt="wine"
                loading="lazy">

            <div class="middle_of_card basicInfo">
                <p class="wine_name">name</p>
                <p class="wine_year">year</p>
                <p class="wine_style">style</p>
            </div>

            <div class="creationDate">
                <p>Created on <br> {{ creationDate }}</p>
            </div>

            <button
                type="button"
                name="exit"
                @click="closeDetails"
                class="details-exit">
                    &times;
            </button>
        </div>
        <hr class="afterTop">

        <div class="details-main">
            <div class="description">
                <p class="sectionTitle">
                    Description
                </p>

                <button
                    type="button"
                    name="button"
                    class="foldingBtn"
                    @click="changeFoldStateDescripton">{{ stateDesc_text }}</button>
            </div>
            <hr>

            <div class="invoices">
                <p class="sectionTitle">
                    Invoices
                </p>

                <button
                    type="button"
                    name="button"
                    class="foldingBtn"
                    @click="changeFoldStateInvoices">{{ stateInv_text }}</button>
            </div>
            <hr>

            <p class="num_of_bottles">Bottles : 842</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detailsView',
    data(){
        return {
            stateDesc_text: 'unfold',
            stateInv_text: 'unfold',
            creationDate: 'dd-mm-yy'
        }
    },

    methods: {
        // NOTE: Not a clean solution but works for now
        changeFoldStateDescripton(){
            if (this.stateDesc_text === 'unfold') {
                this.stateDesc_text = 'fold';
            } else if (this.stateDesc_text === 'fold') {
                this.stateDesc_text = 'unfold';
            }
        },
        changeFoldStateInvoices(){
            if (this.stateInv_text === 'unfold') {
                this.stateInv_text = 'fold';
            } else if (this.stateInv_text === 'fold') {
                this.stateInv_text = 'unfold';
            }
        },

        closeDetails(){
            alert("Closing");
        }
    }
}
</script>
