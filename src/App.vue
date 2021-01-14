<!-- <template>
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
</script> -->

<!--<script>
/*
// Source:
// https://www.wrappixel.com/build-a-shopping-cart-in-nodejs-and-vue-vite/
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const res = await fetch("http://localhost:4000/product");
      const data = await res.json();
      this.products = new Proxy(data.data, {});
      console.log(this.products);
    },
  },
};
*/
</script>
-->
