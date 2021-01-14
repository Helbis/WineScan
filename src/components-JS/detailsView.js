app.component('detailsView', {
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
            const activeElems = document.querySelectorAll('.detailsView.active');
            activeElems.forEach(elm => {
                if (elm == null) { return; }
                elm.classList.remove('active');
                elm.classList.add('inactive');
            });
        }
    },

    template:`
    <article class="detailsView inactive">
        <header class="details-top">
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
        </header>
        <hr class="afterTop">

        <main class="details-main">
            <section class="description">
                <p class="sectionTitle">
                    Description
                </p>

                <button
                    type="button"
                    name="button"
                    class="foldingBtn"
                    @click="changeFoldStateDescripton">{{ stateDesc_text }}
                </button>
            </section>
            <hr>

            <section class="invoices">
                <p class="sectionTitle">
                    Invoices
                </p>

                <button
                    type="button"
                    name="button"
                    class="foldingBtn"
                    @click="changeFoldStateInvoices">{{ stateInv_text }}
                </button>
            </section>
            <hr>
        </main>

        <footer>
            <p class="num_of_bottles">Bottles : 842</p>
        </footer>
    </article>
    `
});
