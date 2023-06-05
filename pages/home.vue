<template>
    <div class="flex flex-col sm:flex-row" v-if="user">
        <div class="flex flex-col basis-1/3 mx-5 mt-3 grow">
            <div class="mt-6">
                <EntryForm />
            </div>
            <div>
                <DailyInputs />
            </div>
           
        </div>
       
        <div class="flex flex-col basis-1/3 mx-5 mt-3 grow">
            <DailyLog />
    </div>
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