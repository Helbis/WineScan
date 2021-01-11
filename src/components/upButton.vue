<!-- BUG:
Button jumps from right to left corners.
It doesn't change it's model's attributes while doing so.
 -->

<template>
    <button
        id="upButton"
        type="button"
        name="upButton"
        @click="scrollUp"
        >^</button>
    <!-- <a href="#" class="upButton">^</a> -->
</template>


<script>
export default {
    name: "upButton",
    methods: {
        scrollUp() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}
</script>
