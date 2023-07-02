<template>
    <div>
        Loading
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})
onMounted(() => {
    setTimeout(() => {
  navigateTo('/home')
}, 5000);
})

</script>

<style scoped>

</style>