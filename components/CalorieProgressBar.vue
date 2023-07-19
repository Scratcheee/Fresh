<template>
    <div class="flex items-center flex-col  ">
        <span class="text-white text-3xl">{{calCount + workout}}</span>
        <span class="text-white">remaining</span>
</div>
</template>

<script setup>
defineProps({
    calCount: Number,
    workout: Number
})
</script>

<style scoped>
</style>