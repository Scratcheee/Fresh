<template>
    <div class="flex justify-center w-full">
        <SetupForm />
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

<style  scoped>

</style>