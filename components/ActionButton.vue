<template>
    <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2 ">{{text}}</button>
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