<template>
    <button class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2 ">{{text}}</button>
</template>

<script setup>
defineProps({
    text: String,
})

</script>

<style scoped>
button {
    background: #9F46E4;

}


</style>