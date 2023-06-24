<template>
    <button class="button  my-2 ">{{text}}</button>
</template>

<script setup>
defineProps({
    text: String,
})

</script>

<style scoped>
.button {
    background: #9F46E4;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    color: #FFFFFF;
    height: 55px;
}

</style>