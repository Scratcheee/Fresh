<template>
    
    <div class="flex flex-col sm:flex-row" v-if="user">
        
        <MainScreen />
      
</div>
<div v-else>
    <h1>Loading...</h1>
    <h2>Please Wait</h2>
</div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})
const user = useSupabaseUser()
onMounted(() => {
    watchEffect(() => {
        if(!user.value) {
            navigateTo('/')
        }

    })
})
</script>

<style  scoped></style>