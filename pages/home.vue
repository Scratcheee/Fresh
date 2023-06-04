<template>
    <div class="flex flex-col sm:flex-row">
        <div class="flex flex-col basis-1/3 mx-5 mt-3 grow">
            <div>
                <DailyInputs />
            </div>
            <div class="mt-6">
                <EntryForm />
            </div>
        </div>
       
        <div class="flex flex-col basis-1/3 mx-5 mt-3 grow">
            <DailyLog />
    </div>
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